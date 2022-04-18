import React, { useContext, useState, useEffect } from "react";
import { useAsync } from "react-async-hook";

import { Swap as SwapClient } from "@project-serum/swap";
import {
  Market,
  OpenOrders,
  Orderbook as OrderbookSide,
} from "@project-serum/serum";
import { useTokenMap, useTokenListContext } from "./TokenList";
import { fetchSolletInfo } from "./Sollet";

const BASE_TAKER_FEE_BPS = 0.0022;
export const FEE_MULTIPLIER = 1 - BASE_TAKER_FEE_BPS;

type DexContext = {
  // Maps market address to open orders accounts.
  openOrders: Map<string, Array<OpenOrders>>;
  closeOpenOrders: (openOrder: OpenOrders) => void;
  swapClient: SwapClient;
};
const _DexContext = React.createContext<DexContext | null>(null);

export function DexContextProvider(props: any) {
  const [ooAccounts, setOoAccounts] = useState<Map<string, Array<OpenOrders>>>(
    new Map()
  );
  const swapClient = props.swapClient;

  // Removes the given open orders from the context.
  const closeOpenOrders = async (openOrder: OpenOrders) => {
    const newOoAccounts = new Map(ooAccounts);
    const openOrders = newOoAccounts
      .get(openOrder.market.toString())
      ?.filter((oo: OpenOrders) => !oo.address.equals(openOrder.address));
    if (openOrders && openOrders.length > 0) {
      newOoAccounts.set(openOrder.market.toString(), openOrders);
    } else {
      newOoAccounts.delete(openOrder.market.toString());
    }
    setOoAccounts(newOoAccounts);
  };


  return (
    <_DexContext.Provider
      value={{
        openOrders: ooAccounts,
        closeOpenOrders,
        swapClient,
      }}
    >
      {props.children}
    </_DexContext.Provider>
  );
}

export function useDexContext(): DexContext {
  const ctx = useContext(_DexContext);
  if (ctx === null) {
    throw new Error("Context not available");
  }
  return ctx;
}

export function useOpenOrders(): Map<string, Array<OpenOrders>> {
  const ctx = useDexContext();
  return ctx.openOrders;
}

// Lazy load a given market.
export function useMarket(market?: any): Market | undefined {
  const { swapClient } = useDexContext();

  const asyncMarket = useAsync(async () => {
    if (!market) {
      return undefined;
    }
    if (_MARKET_CACHE.get(market.toString())) {
      return _MARKET_CACHE.get(market.toString());
    }
  }, [swapClient.program.provider.connection, market]);

  if (asyncMarket.result) {
    return asyncMarket.result;
  }

  return undefined;
}

// Lazy load the orderbook for a given market.
export function useOrderbook(market?: any): Orderbook | undefined {
  const { swapClient } = useDexContext();
  const marketClient = useMarket(market);
  const [refresh, setRefresh] = useState(0);

  const asyncOrderbook = useAsync(async () => {
    if (!market || !marketClient) {
      return undefined;
    }
    if (_ORDERBOOK_CACHE.get(market.toString())) {
      return _ORDERBOOK_CACHE.get(market.toString());
    }

    const orderbook = new Promise<Orderbook>(async (resolve) => {
      const [bids, asks] = await Promise.all([
        marketClient.loadBids(swapClient.program.provider.connection),
        marketClient.loadAsks(swapClient.program.provider.connection),
      ]);

      resolve({
        bids,
        asks,
      });
    });

    _ORDERBOOK_CACHE.set(market.toString(), orderbook);

    return orderbook;
  }, [refresh, swapClient.program.provider.connection, market, marketClient]);

  // Stream in bids updates.
  useEffect(() => {
    let listener: number | undefined;
    if (marketClient?.bidsAddress) {
      listener = swapClient.program.provider.connection.onAccountChange(
        marketClient?.bidsAddress,
        async (info) => {
          const bids = OrderbookSide.decode(marketClient, info.data);
          const orderbook = await _ORDERBOOK_CACHE.get(
            marketClient.address.toString()
          );
          const oldBestBid = orderbook?.bids.items(true).next().value;
          const newBestBid = bids.items(true).next().value;
          if (
            orderbook &&
            oldBestBid &&
            newBestBid &&
            oldBestBid.price !== newBestBid.price
          ) {
            orderbook.bids = bids;
            setRefresh((r) => r + 1);
          }
        }
      );
    }
    return () => {
      if (listener) {
        swapClient.program.provider.connection.removeAccountChangeListener(
          listener
        );
      }
    };
  }, [
    marketClient,
    marketClient?.bidsAddress,
    swapClient.program.provider.connection,
  ]);

  // Stream in asks updates.
  useEffect(() => {
    let listener: number | undefined;
    if (marketClient?.asksAddress) {
      listener = swapClient.program.provider.connection.onAccountChange(
        marketClient?.asksAddress,
        async (info) => {
          const asks = OrderbookSide.decode(marketClient, info.data);
          const orderbook = await _ORDERBOOK_CACHE.get(
            marketClient.address.toString()
          );
          const oldBestOffer = orderbook?.asks.items(false).next().value;
          const newBestOffer = asks.items(false).next().value;
          if (
            orderbook &&
            oldBestOffer &&
            newBestOffer &&
            oldBestOffer.price !== newBestOffer.price
          ) {
            orderbook.asks = asks;
            setRefresh((r) => r + 1);
          }
        }
      );
    }
    return () => {
      if (listener) {
        swapClient.program.provider.connection.removeAccountChangeListener(
          listener
        );
      }
    };
  }, [
    marketClient,
    marketClient?.bidsAddress,
    swapClient.program.provider.connection,
  ]);

  if (asyncOrderbook.result) {
    return asyncOrderbook.result;
  }

  return undefined;
}

export function useMarketName(market: any): string | null {
  const tokenMap = useTokenMap();
  const marketClient = useMarket(market);
  if (!marketClient) {
    return null;
  }
  const baseTicker = marketClient
    ? tokenMap.get(marketClient?.baseMintAddress.toString())?.symbol
    : "-";
  const quoteTicker = marketClient
    ? tokenMap.get(marketClient?.quoteMintAddress.toString())?.symbol
    : "-";
  const name = `${baseTicker} / ${quoteTicker}`;
  return name;
}

// Fair price for a given market, as defined by the mid.
export function useBbo(market?: any): Bbo | undefined {
  const orderbook = useOrderbook(market);
  if (orderbook === undefined) {
    return undefined;
  }
  const bestBid = orderbook.bids.items(true).next().value;
  const bestOffer = orderbook.asks.items(false).next().value;
  if (!bestBid && !bestOffer) {
    return {};
  }
  if (!bestBid) {
    return { bestOffer: bestOffer.price };
  }
  if (!bestOffer) {
    return { bestBid: bestBid.price };
  }
  const mid = (bestBid.price + bestOffer.price) / 2.0;
  return { bestBid: bestBid.price, bestOffer: bestOffer.price, mid };
}

// Fair price for a theoretical toMint/fromMint market. I.e., the number
// of `fromMint` tokens to purchase a single `toMint` token. Aggregates
// across a trade route, if needed.
export function useFairRoute(
  fromMint: any,
  toMint: any
): number | undefined {
  const route = useRoute(fromMint, toMint);
  const fromBbo = useBbo(route ? route[0] : undefined);
  const fromMarket = useMarket(route ? route[0] : undefined);
  const toBbo = useBbo(route ? route[1] : undefined);

  if (route === null) {
    return undefined;
  }

  if (route.length === 1 && fromBbo !== undefined) {
    if (fromMarket === undefined) {
      return undefined;
    }
  }
  if (
    fromBbo === undefined ||
    fromBbo.bestBid === undefined ||
    toBbo === undefined ||
    toBbo.bestOffer === undefined
  ) {
    return undefined;
  }
  return toBbo.bestOffer / fromBbo.bestBid;
}

export function useRoute(
  fromMint: any,
  toMint: any
): Array<any> | null {
  const route = useRouteVerbose(fromMint, toMint);
  if (route === null) {
    return null;
  }
  return route.markets;
}

// Types of routes.
//
// 1. Direct trades on USDC quoted markets.
// 2. Transitive trades across two USDC qutoed markets.
// 3. Wormhole <-> Sollet one-to-one swap markets.
// 4. Wormhole <-> Native one-to-one swap markets.
//
export function useRouteVerbose(
  fromMint: any,
  toMint: any
): { markets: Array<any>; kind: RouteKind } | null {
  const { swapClient } = useDexContext();
  const { wormholeMap, solletMap } = useTokenListContext();
  const asyncRoute = useAsync(async () => {
  }, [fromMint, toMint, swapClient]);

  if (asyncRoute.result) {
    return asyncRoute.result;
  }
  return null;
}

type Orderbook = {
  bids: OrderbookSide;
  asks: OrderbookSide;
};

// Wormhole utils.

type RouteKind = "wormhole-native" | "wormhole-sollet" | "usdx";

// Maps fromMint || toMint (in sort order) to swap market public key.
// All markets for wormhole<->native tokens should be here, e.g.
// USDC <-> wUSDC.
// const WORMHOLE_NATIVE_MAP = new Map<string, PublicKey>([
//   [wormKey(WORM_USDC_MINT, USDC_MINT), WORM_USDC_MARKET],
//   [wormKey(WORM_USDT_MINT, USDT_MINT), WORM_USDT_MARKET],
// ]);

function wormKey(fromMint: any, toMint: any): string {
  const [first, second] =
    fromMint < toMint ? [fromMint, toMint] : [toMint, fromMint];
  return first.toString() + second.toString();
}

// Returns the market address of the 1-1 sollet<->wormhole swap market if it
// exists. Otherwise, returns null.
async function wormholeSolletMarket(
  conn: any,
  fromMint: any,
  toMint: any,
  wormholeMap: Map<string, any>,
  solletMap: Map<string, any>
): Promise<any | null> {
  const fromWormhole = wormholeMap.get(fromMint.toString());
  const isFromWormhole = fromWormhole !== undefined;

  const toWormhole = wormholeMap.get(toMint.toString());
  const isToWormhole = toWormhole !== undefined;

  const fromSollet = solletMap.get(fromMint.toString());
  const isFromSollet = fromSollet !== undefined;

  const toSollet = solletMap.get(toMint.toString());
  const isToSollet = toSollet !== undefined;

  if ((isFromWormhole || isToWormhole) && isFromWormhole !== isToWormhole) {
    if ((isFromSollet || isToSollet) && isFromSollet !== isToSollet) {
      const base = isFromSollet ? fromMint : toMint;
      const [quote, wormholeInfo] = isFromWormhole
        ? [fromMint, fromWormhole]
        : [toMint, toWormhole];

      const solletInfo = await fetchSolletInfo(base);

      if (solletInfo.erc20Contract !== wormholeInfo!.extensions?.address) {
        return null;
      }

    }
  }
  return null;
}

type Bbo = {
  bestBid?: number;
  bestOffer?: number;
  mid?: number;
};

const _ORDERBOOK_CACHE = new Map<string, Promise<Orderbook>>();
const _MARKET_CACHE = new Map<string, Promise<Market>>();

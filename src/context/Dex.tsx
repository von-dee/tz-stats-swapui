import React, { useContext, useState, useEffect } from "react";
import { useAsync } from "react-async-hook";

import { useTokenMap, useTokenListContext } from "./TokenList";
import { fetchSolletInfo } from "./Sollet";

const BASE_TAKER_FEE_BPS = 0.0022;
export const FEE_MULTIPLIER = 1 - BASE_TAKER_FEE_BPS;

export function DexContextProvider(props: any) {
  

  return null;
}


export function useRoute(
  fromMint: any,
  toMint: any
): Array<any> | null {
  const route = null;
  if (route === null) {
    return null;
  }
  return route;
}



// Wormhole utils.

type RouteKind = "wormhole-native" | "wormhole-sollet" | "usdx";

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

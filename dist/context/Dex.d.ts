/// <reference types="react" />
import { Swap as SwapClient } from "@project-serum/swap";
import { Market, OpenOrders, Orderbook as OrderbookSide } from "@project-serum/serum";
export declare const FEE_MULTIPLIER: number;
declare type DexContext = {
    openOrders: Map<string, Array<OpenOrders>>;
    closeOpenOrders: (openOrder: OpenOrders) => void;
    swapClient: SwapClient;
};
export declare function DexContextProvider(props: any): JSX.Element;
export declare function useDexContext(): DexContext;
export declare function useOpenOrders(): Map<string, Array<OpenOrders>>;
export declare function useMarket(market?: any): Market | undefined;
export declare function useOrderbook(market?: any): Orderbook | undefined;
export declare function useMarketName(market: any): string | null;
export declare function useBbo(market?: any): Bbo | undefined;
export declare function useFairRoute(fromMint: any, toMint: any): number | undefined;
export declare function useRoute(fromMint: any, toMint: any): Array<any> | null;
export declare function useRouteVerbose(fromMint: any, toMint: any): {
    markets: Array<any>;
    kind: RouteKind;
} | null;
declare type Orderbook = {
    bids: OrderbookSide;
    asks: OrderbookSide;
};
declare type RouteKind = "wormhole-native" | "wormhole-sollet" | "usdx";
declare type Bbo = {
    bestBid?: number;
    bestOffer?: number;
    mid?: number;
};
export {};

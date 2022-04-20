import { UseAsyncReturn } from "react-async-hook";
declare type SolletInfo = {
    blockchain: string;
    erc20Contract: string;
    name: string;
    splMint: any;
    ticker: string;
};
export declare function useSolletInfo(mint: any): UseAsyncReturn<SolletInfo>;
export declare function fetchSolletInfo(mint: any): Promise<SolletInfo>;
export declare function requestWormholeSwapMarketIfNeeded(connection: any, solletMint: any, wormholeMint: any, swapMarket: any, solletInfo: SolletInfo): Promise<boolean>;
export declare function swapApiRequest(method: string, path: string, body?: Object): Promise<any>;
export declare class SwapApiError extends Error {
    readonly name: string;
    readonly status: number;
    constructor(msg: string, status: number);
}
export {};

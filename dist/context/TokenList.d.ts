/// <reference types="react" />
declare type TokenListContext = {
    tokenMap: Map<string, any>;
    wormholeMap: Map<string, any>;
    solletMap: Map<string, any>;
    swappableTokens: any[];
    swappableTokensSollet: any[];
    swappableTokensWormhole: any[];
};
export declare const SPL_REGISTRY_SOLLET_TAG = "wrapped-sollet";
export declare const SPL_REGISTRY_WORM_TAG = "wormhole";
export declare function TokenListContextProvider(props: any): JSX.Element;
export declare function useTokenListContext(): TokenListContext;
export declare function useTokenMap(): Map<string, any>;
export declare function useSwappableTokens(): {
    swappableTokens: any[];
    swappableTokensWormhole: any[];
    swappableTokensSollet: any[];
};
export {};

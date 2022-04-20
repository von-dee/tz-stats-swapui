/// <reference types="react" />
import { Market } from "@project-serum/serum";
export declare type SwapContext = {
    fromMint: any;
    setFromMint: (m: any) => void;
    toMint: any;
    setToMint: (m: any) => void;
    fromAmount: number;
    setFromAmount: (a: number) => void;
    toAmount: number;
    setToAmount: (a: number) => void;
    swapToFromMints: () => void;
    slippage: number;
    setSlippage: (n: number) => void;
    fairOverride: number | null;
    setFairOverride: (n: number | null) => void;
    referral?: any;
    isClosingNewAccounts: boolean;
    isStrict: boolean;
    setIsStrict: (isStrict: boolean) => void;
    setIsClosingNewAccounts: (b: boolean) => void;
};
export declare function SwapContextProvider(props: any): JSX.Element;
export declare function useSwapContext(): SwapContext;
export declare function useCanSwap(): boolean;
export declare function useReferral(fromMarket?: Market): any | undefined;

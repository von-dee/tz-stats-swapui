/// <reference types="react" />
import { Provider } from "@project-serum/anchor";
export declare type TokenContext = {
    provider: Provider;
};
export declare function TokenContextProvider(props: any): JSX.Element;
export declare function useOwnedTokenAccount(mint?: any): {
    publicKey: any;
    account: any;
} | null | undefined;
export declare function useMint(mint?: any): any | undefined | null;
export declare function setMintCache(pk: any, account: any): void;

import * as assert from "assert";
import React, { useContext, useState, useEffect } from "react";
import { useAsync } from "react-async-hook";


import { Market } from "@project-serum/serum";
import { TEZ_MINT, QUP_MINT } from "../utils/pubkeys";

import {
  useTokenListContext
} from "./TokenList";
import { useOwnedTokenAccount } from "../context/Token";

const DEFAULT_SLIPPAGE_PERCENT = 0.5;

export type SwapContext = {
  // Mint being traded from. The user must own these tokens.
  fromMint: any;
  setFromMint: (m: any) => void;

  // Mint being traded to. The user will receive these tokens after the swap.
  toMint: any;
  setToMint: (m: any) => void;

  // Amount used for the swap.
  fromAmount: number;
  setFromAmount: (a: number) => void;

  // *Expected* amount received from the swap.
  toAmount: number;
  setToAmount: (a: number) => void;

  // Function to flip what we consider to be the "to" and "from" mints.
  swapToFromMints: () => void;

  // The amount (in units of percent) a swap can be off from the estimate
  // shown to the user.
  slippage: number;
  setSlippage: (n: number) => void;

  // Null if the user is using fairs directly from DEX prices.
  // Otherwise, a user specified override for the price to use when calculating
  // swap amounts.
  fairOverride: number | null;
  setFairOverride: (n: number | null) => void;

  // The referral *owner* address. Associated token accounts must be created,
  // first, for this to be used.
  referral?: any;

  // True if all newly created market accounts should be closed in the
  // same user flow (ideally in the same transaction).
  isClosingNewAccounts: boolean;

  // True if the swap exchange rate should be a function of nothing but the
  // from and to tokens, ignoring any quote tokens that may have been
  // accumulated by performing the swap.
  //
  // Always false (for now).
  isStrict: boolean;
  setIsStrict: (isStrict: boolean) => void;

  setIsClosingNewAccounts: (b: boolean) => void;
};
const _SwapContext = React.createContext<null | SwapContext>(null);

export function SwapContextProvider(props: any) {
  const [fromMint, setFromMint] = useState(props.fromMint ?? TEZ_MINT);
  const [toMint, setToMint] = useState(props.toMint ?? QUP_MINT);
  const [fromAmount, _setFromAmount] = useState(props.fromAmount ?? 0);
  const [toAmount, _setToAmount] = useState(props.toAmount ?? 0);
  const [isClosingNewAccounts, setIsClosingNewAccounts] = useState(false);
  const [isStrict, setIsStrict] = useState(false);
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE_PERCENT);
  const [fairOverride, setFairOverride] = useState<number | null>(null);
  
  const referral = props.referral;

  assert.ok(slippage >= 0);

  
  const swapToFromMints = () => {
    const oldFrom = fromMint;
    const oldTo = toMint;
    const oldToAmount = toAmount;
    _setFromAmount(oldToAmount);
    setFromMint(oldTo);
    setToMint(oldFrom);
  };

  const setFromAmount = (amount: number) => {
    
    _setFromAmount(amount);
    
  };

  const setToAmount = (amount: number) => {
    
    _setToAmount(amount);
    
  };

  return (
    <_SwapContext.Provider
      value={{
        fromMint,
        setFromMint,
        toMint,
        setToMint,
        fromAmount,
        setFromAmount,
        toAmount,
        setToAmount,
        swapToFromMints,
        slippage,
        setSlippage,
        fairOverride,
        setFairOverride,
        isClosingNewAccounts,
        isStrict,
        setIsStrict,
        setIsClosingNewAccounts,
        referral,
      }}
    >
      {props.children}
    </_SwapContext.Provider>
  );
}

export function useSwapContext(): SwapContext {
  const ctx = useContext(_SwapContext);
  if (ctx === null) {
    throw new Error("Context not available");
  }
  return ctx;
}



// Returns true if the user can swap with the current context.
export function useCanSwap(): boolean {
  const { fromMint, toMint, fromAmount, toAmount } = useSwapContext();
  const { wormholeMap, solletMap } = useTokenListContext();
  const fromWallet = useOwnedTokenAccount(fromMint);

  return (
    // From wallet exists.
    fromWallet !== undefined &&
    fromWallet !== null &&
    // Mints are distinct.
    fromMint.equals(toMint) === false &&
    // Trade amounts greater than zero.
    fromAmount > 0 &&
    toAmount > 0
  );
}

export function useReferral(fromMarket?: Market): any | undefined {
  const { referral } = useSwapContext();
  const asyncReferral = useAsync(async () => {
    if (!referral) {
      return undefined;
    }
    if (!fromMarket) {
      return undefined;
    }
    

    return null;
  }, [fromMarket]);

  if (!asyncReferral.result) {
    return undefined;
  }
  return asyncReferral.result;
}

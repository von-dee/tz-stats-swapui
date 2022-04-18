import React, { useState, useEffect } from "react";

import { useAsync } from "react-async-hook";
import { Provider, BN } from "@project-serum/anchor";
import {
  getOwnedAssociatedTokenAccounts,
} from "../utils/tokens";

export type TokenContext = {
  provider: Provider;
};
const _TokenContext = React.createContext<TokenContext | null>(null);

export function TokenContextProvider(props: any) {
  const provider = props.provider;
  const [, setRefresh] = useState(0);

  // Fetch all the owned token accounts for the wallet.
  useEffect(() => {
    if (!provider.wallet.publicKey) {
      _OWNED_TOKEN_ACCOUNTS_CACHE.length = 0;
      setRefresh((r) => r + 1);
      return;
    }
    // Fetch SPL tokens.
    getOwnedAssociatedTokenAccounts(
      provider.connection,
      provider.wallet.publicKey
    ).then((accs) => {
      if (accs) {
        // @ts-ignore
        _OWNED_TOKEN_ACCOUNTS_CACHE.push(...accs);
        setRefresh((r) => r + 1);
      }
    });
    // Fetch SOL balance.
    provider.connection
      .getAccountInfo(provider.wallet.publicKey)
      .then((acc: { lamports: number }) => {
        if (acc) {
          _OWNED_TOKEN_ACCOUNTS_CACHE.push({
            publicKey: provider.wallet.publicKey,
            // @ts-ignore
            account: {
              amount: new BN(acc.lamports),
              // mint: SOL_MINT,
            },
          });
          setRefresh((r) => r + 1);
        }
      });
  }, [provider.wallet.publicKey, provider.connection]);

  return (
    <_TokenContext.Provider
      value={{
        provider,
      }}
    >
      {props.children}
    </_TokenContext.Provider>
  );
}

function useTokenContext() {}

// Null => none exists.
// Undefined => loading.
export function useOwnedTokenAccount(
  mint?: any
): { publicKey: any; account: any } | null | undefined {
  // const { provider } = useTokenContext();
  const [, setRefresh] = useState(0);
  const tokenAccounts = _OWNED_TOKEN_ACCOUNTS_CACHE.filter(
    (account) => mint && account.account.mint.equals(mint)
  );

  // Take the account with the most tokens in it.
  tokenAccounts.sort((a, b) =>
    a.account.amount > b.account.amount
      ? -1
      : a.account.amount < b.account.amount
      ? 1
      : 0
  );

  let tokenAccount = tokenAccounts[0];
  const isSol = false;

  // Stream updates when the balance changes.
  useEffect(() => {
    let listener: number;
    // SOL is special cased since it's not an SPL token.
    if (tokenAccount && isSol) {
      
    }
    // SPL tokens.
    else if (tokenAccount) {
      
    }
    return () => {
      if (listener) {
        // provider.connection.removeAccountChangeListener(listener);
      }
    };
  }, []);

  if (mint === undefined) {
    return undefined;
  }

  if (!isSol && tokenAccounts.length === 0) {
    return null;
  }

  return tokenAccount;
}

export function useMint(mint?: any): any | undefined | null {

  // Lazy load the mint account if needeed.
  const asyncMintInfo = useAsync(async () => {
    if (!mint) {
      return undefined;
    }
    if (_MINT_CACHE.get(mint.toString())) {
      return _MINT_CACHE.get(mint.toString());
    }

  
  }, []);

  if (asyncMintInfo.result) {
    return asyncMintInfo.result;
  }
  return undefined;
}

export function setMintCache(pk: any, account: any) {
  _MINT_CACHE.set(pk.toString(), new Promise((resolve) => resolve(account)));
}

// Cache storing all token accounts for the connected wallet provider.
const _OWNED_TOKEN_ACCOUNTS_CACHE: Array<{
  publicKey: any;
  account: any;
}> = [];

// Cache storing all previously fetched mint infos.
// @ts-ignore
const _MINT_CACHE = new Map<string, Promise<MintInfo>>([
  
]);

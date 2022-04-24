// TODO: replace this whole file with something more modern. This is all copied
//       from sollet.


export function parseTokenAccountData(data: Buffer): any {
  // @ts-ignore
  let { mint, owner, amount } = ACCOUNT_LAYOUT.decode(data);
  // @ts-ignore
  return {
    // mint: new PublicKey(mint),
    // owner: new PublicKey(owner),
    // amount: new BN(amount),
  };
}

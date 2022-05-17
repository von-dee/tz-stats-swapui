

import BigNumber from "bignumber.js";

import {
  toValidAmount,
  estimateTezToToken,
  estimateTezToTokenInverse,
  estimateTokenToTez,
  estimateTokenToTezInverse,
  getDexStorage,
  toNat,
  tzToMutez,
  deapproveFA2,
  isUnsafeAllowanceChangeError,
  approveToken,
  clearMem,
  confirmOperation,
  getBalance,
  getNetwork
} from "./core";

import { TezosToolkit } from '@taquito/taquito';
import { OpKind, WalletOperation } from "@taquito/taquito";


/*
  import store, { getAccount, useWallet } from "@/store";
  import {
    getBalance
  } from "@/core";
  
*/

  
export function handleInputAmountChange(tokens: any) {
  let inputAmount = tokens.inputAmount;
  let outputAmount = null;
  const isNum = /^[0-9.]*$/g.test(tokens.inputAmount);
  if (isNum) {
      outputAmount = calcOutputAmount(tokens);
  } else {
      outputAmount = "";
  }

  return outputAmount;
}

export function handleOutputAmountChange(tokens: any) {
  let outputAmount = tokens.outputAmount;
  let inputAmount = null;
  const isNum = /^[0-9.]*$/g.test(tokens.outputAmount);
  if (isNum) {
      inputAmount = calcInputAmount(tokens);
  } else {
      inputAmount = "";
  }
  
  return outputAmount;
}

async function calcOutputAmount(tokens: any) {
  
  if (!tokens.inputToken || !tokens.outputToken) return;

  const inType = tokens.inputToken.type;
  const outType = tokens.outputToken.type;

  let amount: BigNumber | undefined;
  switch (true) {
    case inType === "xtz" && outType === "token":
      if (tokens.outputDexAddress) {
        amount = estimateTezToToken(
          tokens.inputAmount,
          await getDexStorage(tokens.outputDexAddress),
          tokens.outputToken
        );
      }
      break;

    case inType === "token" && outType === "xtz":
      if (tokens.inputDexAddress) {
        amount = estimateTokenToTez(
          tokens.inputAmount,
          await getDexStorage(tokens.inputDexAddress),
          tokens.inputToken
        );
      }
      break;

    case inType === "token" && outType === "token":
      if (tokens.inputDexAddress && tokens.outputDexAddress) {
        amount = estimateTezToToken(
          estimateTokenToTez(
            tokens.inputAmount,
            await getDexStorage(tokens.inputDexAddress),
            tokens.inputToken
          ),
          await getDexStorage(tokens.outputDexAddress),
          tokens.outputToken
        );
      }
      break;

    default:
      break;
      
  }


  tokens.outputAmount = await toValidAmount(amount);


  return tokens.outputAmount;
}

async function calcInputAmount(tokens: any) {
  
  if (!tokens.inputToken || !tokens.outputToken) return;

  const inType = tokens.inputToken.type;
  const outType = tokens.outputToken.type;

  let amount: BigNumber | undefined;
  switch (true) {
    case inType === "xtz" && outType === "token":
      if (tokens.outputDexAddress) {
        amount = estimateTezToTokenInverse(
          tokens.outputAmount,
          await getDexStorage(tokens.outputDexAddress),
          tokens.outputToken
        );
      }
      break;

    case inType === "token" && outType === "xtz":
      if (tokens.inputDexAddress) {
        amount = estimateTokenToTezInverse(
          tokens.outputAmount,
          await getDexStorage(tokens.inputDexAddress),
          tokens.inputToken
        );
      }
      break;

    case inType === "token" && outType === "token":
      if (tokens.inputDexAddress && tokens.outputDexAddress) {
        amount = estimateTokenToTezInverse(
          estimateTezToTokenInverse(
            tokens.outputAmount,
            await getDexStorage(tokens.outputDexAddress),
            tokens.outputToken
          ),
          await getDexStorage(tokens.inputDexAddress),
          tokens.inputToken
        );
      }
      break;

    default:
      break;
  }

  tokens.inputAmount = toValidAmount(amount);
  return tokens.inputAmount;
}


function minimumReceived(outputToken: any, outputAmount: any) {
  const activeSlippagePercentage = 0.5;
  
  if (!outputToken || !outputAmount) return null;
  const base = new BigNumber(100)
    .minus(activeSlippagePercentage || 0)
    .div(100)
    .times(outputAmount);

  return base.toFixed(outputToken.decimals, BigNumber.ROUND_DOWN);
}


export async function swap(tokens: any, wallet: any) {

  
  const network = getNetwork();
  const tezos = wallet;
  let swapStatus = null;

  try {


    const me = wallet.wallet._pkh;

    const recipient = me;

    const inTk = tokens.inputToken!;
    const outTk = tokens.outputToken!;
    const inpAmn = new BigNumber(tokens.inputAmount!);
    const minReceived: any = minimumReceived(tokens.outputToken, tokens.outputAmount);
    const minOut = new BigNumber(minReceived);


    let bal: BigNumber | undefined;
    try {
      bal = await getBalance(me, inTk);
    } catch (_err) {}
    if (bal && bal.isLessThan(inpAmn)) {
      throw new Error("Not Enough Funds");
    }

    let operation: WalletOperation;
    if (inTk.type === "xtz" && outTk.type === "token" && tokens.outputDexAddress) {
      const contract = await tezos.wallet.at(tokens.outputDexAddress);

      operation = await contract.methods
        .use("tezToTokenPayment", toNat(minOut, outTk).toFixed(), recipient)
        .send({ amount: inpAmn as any });
    } else if (inTk.type === "token" && outTk.type === "xtz" && tokens.inputDexAddress) {
      const [tokenContract, dexContract] = await Promise.all([
        tezos.wallet.at(inTk.id),
        tezos.wallet.at(tokens.inputDexAddress),
      ]);

      const tokenAmountNat = toNat(inpAmn, inTk).toFixed();

      let withAllowanceReset = false;
      try {
        await tezos.estimate.batch([
          {
            kind: OpKind.TRANSACTION,
            ...approveToken(
              inTk,
              tokenContract,
              me,
              tokens.inputDexAddress,
              tokenAmountNat
            ).toTransferParams(),
          },
          {
            kind: OpKind.TRANSACTION,
            ...dexContract.methods
              .use(
                "tokenToTezPayment",
                tokenAmountNat,
                tzToMutez(minOut),
                recipient
              )
              .toTransferParams(),
          },
        ]);
      } catch (err) {
        if (isUnsafeAllowanceChangeError(err)) {
          withAllowanceReset = true;
        } else {
          console.error(err);
        }
      }

      let batch = tezos.wallet.batch([]);

      if (withAllowanceReset) {
        batch = batch.withTransfer(
          approveToken(
            inTk,
            tokenContract,
            me,
            tokens.inputDexAddress,
            0
          ).toTransferParams()
        );
      }

      batch = batch
        .withTransfer(
          approveToken(
            inTk,
            tokenContract,
            me,
            tokens.inputDexAddress,
            tokenAmountNat
          ).toTransferParams()
        )
        .withTransfer(
          dexContract.methods
            .use(
              "tokenToTezPayment",
              tokenAmountNat,
              tzToMutez(minOut),
              recipient
            )
            .toTransferParams()
        );

      deapproveFA2(
        batch,
        inTk,
        tokenContract,
        me,
        tokens.inputDexAddress,
      );

      operation = await batch.send();
    } else if (inTk.type === "token" && outTk.type === "token" && tokens.inputDexAddress && tokens.outputDexAddress) {
      const [
        inTokenContract,
        inDexContract,
        outDexContract,
      ] = await Promise.all([
        tezos.wallet.at(inTk.id),
        tezos.wallet.at(tokens.inputDexAddress),
        tezos.wallet.at(tokens.outputDexAddress),
      ]);

      const tezAmount = estimateTokenToTez(
        tokens.inputAmount,
        await getDexStorage(tokens.inputDexAddress),
        inTk
      );

      const inpAmnNat = toNat(inpAmn, inTk).toFixed();

      let withAllowanceReset = false;
      try {
        await tezos.estimate.batch([
          {
            kind: OpKind.TRANSACTION,
            ...approveToken(
              inTk,
              inTokenContract,
              me,
              tokens.inputDexAddress,
              inpAmnNat
            ).toTransferParams(),
          },
          {
            kind: OpKind.TRANSACTION,
            ...inDexContract.methods
              .use(
                "tokenToTezPayment",
                inpAmnNat,
                tzToMutez(tezAmount)
                  .integerValue(BigNumber.ROUND_DOWN)
                  .toFixed(),
                me
              )
              .toTransferParams(),
          },
          {
            kind: OpKind.TRANSACTION,
            ...outDexContract.methods
              .use("tezToTokenPayment", toNat(minOut, outTk), recipient)
              .toTransferParams({ amount: tezAmount.toFixed() as any }),
          },
        ]);
      } catch (err) {
        if (isUnsafeAllowanceChangeError(err)) {
          withAllowanceReset = true;
        } else {
          console.error(err);
        }
      }

      let batch = tezos.wallet.batch([]);

      if (withAllowanceReset) {
        batch = batch.withTransfer(
          approveToken(
            inTk,
            inTokenContract,
            me,
            tokens.inputDexAddress,
            0
          ).toTransferParams()
        );
      }

      batch = batch
        .withTransfer(
          approveToken(
            inTk,
            inTokenContract,
            me,
            tokens.inputDexAddress,
            inpAmnNat
          ).toTransferParams()
        )
        .withTransfer(
          inDexContract.methods
            .use(
              "tokenToTezPayment",
              inpAmnNat,
              tzToMutez(tezAmount)
                .integerValue(BigNumber.ROUND_DOWN)
                .toFixed(),
              me
            )
            .toTransferParams()
        )
        .withTransfer(
          outDexContract.methods
            .use("tezToTokenPayment", toNat(minOut, outTk), recipient)
            .toTransferParams({ amount: tezAmount.toFixed() as any })
        );

      deapproveFA2(
        batch,
        inTk,
        inTokenContract,
        me,
        tokens.inputDexAddress,
      );

      operation = await batch.send();
    }

    // const response = confirmOperation(tezos, operation!.opHash)
    //     .finally(() => refresh());

    const response = confirmOperation(tezos, operation!.opHash);

    console.log("response");
    console.log(response); 

    // notifyConfirm(
      return response;
    // );
  } catch (err: any) {
    console.error(err);
    // notifyError(err);
    console.log(err);

    const msg = err.message;
    return msg;
    // swapStatus =
    //   msg && msg.length < 30
    //     ? msg.startsWith("Dex/")
    //       ? msg.replace("Dex/", "")
    //       : msg
    //     : "Something went wrong";
  }
  // this.swapping = false;

  await new Promise((res) => setTimeout(res, 5000));
  
}

function refresh() {
  clearMem();
}
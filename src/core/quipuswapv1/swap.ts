

import { useSwapContext } from "../../context/Swap";

function SwapFromForm() {
    const { fromMint, fromAmount } = useSwapContext();

    console.log("fromMint");
    console.log(fromMint);
}

export function handleInputAmountChange(amount: string) {
    SwapFromForm();

    // let inputAmount = amount;
    // let outputAmount = "";
    // const isNum = /^[0-9.]*$/g.test(amount);
    // if (isNum) {
    //     outputAmount = exports.calcOutputAmount();
    // } else {
    //     outputAmount = "";
    // }

    // return {
    //     inputAmount: inputAmount, 
    //     outputAmount: outputAmount
    // }

}

export function handleOutputAmountChange(amount: string) {
    let outputAmount = amount;
    let inputAmount = "";
    const isNum = /^[0-9.]*$/g.test(amount);
    if (isNum) {
        inputAmount = exports.calcInputAmount();
    } else {
        inputAmount = "";
    }
    
    return {
        inputAmount: inputAmount, 
        outputAmount: outputAmount
    }
}

export async function calcOutputAmount() {
    console.log();
    // if (!this.inputToken || !this.outputToken) return;

    // const inType = this.inputToken.type;
    // const outType = this.outputToken.type;

    // let amount: BigNumber | undefined;
    // switch (true) {
    //   case inType === "xtz" && outType === "token":
    //     if (this.outputDexAddress) {
    //       amount = estimateTezToToken(
    //         this.inputAmount,
    //         await getDexStorage(this.outputDexAddress),
    //         this.outputToken
    //       );
    //     }
    //     break;

    //   case inType === "token" && outType === "xtz":
    //     if (this.inputDexAddress) {
    //       amount = estimateTokenToTez(
    //         this.inputAmount,
    //         await getDexStorage(this.inputDexAddress),
    //         this.inputToken
    //       );
    //     }
    //     break;

    //   case inType === "token" && outType === "token":
    //     if (this.inputDexAddress && this.outputDexAddress) {
    //       amount = estimateTezToToken(
    //         estimateTokenToTez(
    //           this.inputAmount,
    //           await getDexStorage(this.inputDexAddress),
    //           this.inputToken
    //         ),
    //         await getDexStorage(this.outputDexAddress),
    //         this.outputToken
    //       );
    //     }
    //     break;
    //     default:
    //     break;
    // }

    // this.outputAmount = toValidAmount(amount);
  }

export async function calcInputAmount() {
    // console.log();
    // if (!this.inputToken || !this.outputToken) return;

    // const inType = this.inputToken.type;
    // const outType = this.outputToken.type;

    // let amount: BigNumber | undefined;
    // switch (true) {
    //   case inType === "xtz" && outType === "token":
    //     if (this.outputDexAddress) {
    //       amount = estimateTezToTokenInverse(
    //         this.outputAmount,
    //         await getDexStorage(this.outputDexAddress),
    //         this.outputToken
    //       );
    //     }
    //     break;

    //   case inType === "token" && outType === "xtz":
    //     if (this.inputDexAddress) {
    //       amount = estimateTokenToTezInverse(
    //         this.outputAmount,
    //         await getDexStorage(this.inputDexAddress),
    //         this.inputToken
    //       );
    //     }
    //     break;

    //   case inType === "token" && outType === "token":
    //     if (this.inputDexAddress && this.outputDexAddress) {
    //       amount = estimateTokenToTezInverse(
    //         estimateTezToTokenInverse(
    //           this.outputAmount,
    //           await getDexStorage(this.outputDexAddress),
    //           this.outputToken
    //         ),
    //         await getDexStorage(this.inputDexAddress),
    //         this.inputToken
    //       );
    //     }
    //     break;

    //   default:
    //     break;
    // }

    // this.inputAmount = toValidAmount(amount);
  }

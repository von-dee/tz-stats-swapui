
import { handleInputAmountChange, swap } from "./quipuswapv1/swap";

export async function fromAmountChange(tokens: any) {
    // For Quipu Swap Version 1
    return await handleInputAmountChange(tokens);
}

export async function toAmountChange(tokens: any) {
    // For Quipu Swap Version 1
    return await handleInputAmountChange(tokens);
}

export async function swapcall(tokens: any, wallet: any) {
    // For Quipu Swap Version 1
    return await swap(tokens, wallet);
}

/// <reference types="react" />
export default function SwapCard({ containerStyle, contentStyle, swapTokenContainerStyle, }: {
    containerStyle?: any;
    contentStyle?: any;
    swapTokenContainerStyle?: any;
}): JSX.Element;
export declare function SwapHeader(): JSX.Element;
export declare function ArrowButton(): JSX.Element;
export declare function SwapTokenForm({ from, style, mint, setMint, amount, setAmount, }: {
    from: boolean;
    style?: any;
    mint: any;
    setMint: (m: any) => void;
    amount: number;
    setAmount: (a: number) => void;
}): JSX.Element;
export declare function TokenIcon({ mint, style }: {
    mint: any;
    style: any;
}): JSX.Element;
export declare function SwapButton(): JSX.Element;

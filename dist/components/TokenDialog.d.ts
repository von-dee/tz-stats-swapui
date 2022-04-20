/// <reference types="react" />
export default function TokenDialog({ open, onClose, setMint, }: {
    open: boolean;
    onClose: () => void;
    setMint: (mint: any) => void;
}): JSX.Element;

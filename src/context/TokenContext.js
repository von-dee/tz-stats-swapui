import { createContext } from "react"

export const toTokenContext = createContext({
    toToken: {
        network: 'mainnet',
        account: null
    },
    settoToken: (a) => {}
})

export const fromTokenContext = createContext({
    fromToken: {
        network: 'mainnet',
        account: null
    },
    setfromToken: (a) => {}
})


export const WalletContext = createContext({
    app: {
        network: 'mainnet',
        account: null
    },
    setApp: (a) => {}
})
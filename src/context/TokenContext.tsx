import { createContext } from "react"
import { QUP_TOKEN, TEZ_TOKEN } from "../utils/pubkeys";

export const selectedTokenContext = createContext({
    selectedToken: {
        toToken: QUP_TOKEN,
        fromToken: TEZ_TOKEN
    }
    ,
    setselectedTokens: () => {}
})


export const WalletContext = createContext({
    app: {
        network: 'mainnet',
        account: null
    },
    setApp: () => {}
})
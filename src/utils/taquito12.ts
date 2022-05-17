
// import {
//     TezosToolkit
// } from "@taquito/taquito";

import {
    TezosToolkit
} from "taquito-taquito-latest";

import {
    getNetwork
} from "../core/quipuswapv1/core/state";

const Tezos = new TezosToolkit(getNetwork().rpcBaseURL)


export const Tezos12 = new TezosToolkit(getNetwork().rpcBaseURL)

export async function getBalanceTQ12(assetID: any, accountPkh: any) {
    const response = await Tezos.contract
    .at(assetID)
    .then((contract) => {
        return contract.views.getBalance(accountPkh).read();
    })
    .then((response) => {
        return response;
    })
    .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));

    return response;
}


export async function getBalanceTQ12withTKID(assetID: any, accountPkh: any) {
    const response = await Tezos.contract
    .at(assetID)
    .then((contract) => {
        return contract.views
        .balance_of([{ owner: accountPkh, token_id: '0' }])
        .read();
    })
    .then((response) => {
        // console.log(JSON.stringify(response, null, 2));
        return response[0].balance;
    })
    .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));

    return response;

}
import {getProvider, getWeb3} from "./web3";
import {RLPEncodedTransaction} from "web3-core";
import {Arguments, getAsyncCommandLineArguments} from "../utils/arguments";
import {ContractAlredyPaused} from "../exception/exceptions";


export const sendSignedTransaction = async (encoded: string): Promise<string> => {
    const web3 = await getWeb3();
    const fromWallet = await getProvider();
    try {
        const commandLineArguments: Arguments = await getAsyncCommandLineArguments();
        const tx = {
            from: fromWallet.getAddresses()[0],
            to: commandLineArguments.address,
            data: encoded
        };

        const signedTransaction: RLPEncodedTransaction = await web3.eth.signTransaction(tx, tx.from);

        return new Promise((resolve, reject) => {
            web3.eth.sendSignedTransaction(signedTransaction.raw).on('receipt', (receipt: any) => {
                resolve(receipt)
            }).on('error', (err: any) => {
                console.log(err)
            })
        })
    } catch (e) {
        throw new ContractAlredyPaused('The smart contract is already in that state')
    }
};

import {getBosonContract} from "./web3";
import {sendSignedTransaction} from "./transactions";

export const paused = async() => {
    const bosonContract = await getBosonContract();
    const status = await bosonContract.methods.paused().call();
    if(status) {
        console.log('Paused')
    } else {
        console.log('Unpaused')
    }
};

export const owner = async(): Promise<string> => {
    const bosonContract = await getBosonContract();
    return await bosonContract.methods.owner().call();
};

export const pause = async(): Promise<void> => {
    const bosonContract = await getBosonContract();
    const encoded = bosonContract.methods.pause().encodeABI();
    await sendSignedTransaction(encoded);
    console.log('Paused');
};

export const unpause = async(): Promise<void> => {
    const bosonContract = await getBosonContract();
    const encoded = bosonContract.methods.unpause().encodeABI();
    await sendSignedTransaction(encoded);
    console.log('Unpaused');
};

import Web3 from 'web3';
const HDWalletProvider = require("@truffle/hdwallet-provider");
import * as bosonProtocol from "../abi/BosonProtocol.json";
import {Arguments, getAsyncCommandLineArguments} from "../utils/arguments";

let web3: any;
let provider: any;
let bosonContract: any;

export const getProvider = async (): Promise<any> => {
    while (!provider) {
        const commandLineArguments: Arguments = await getAsyncCommandLineArguments();
        provider = new HDWalletProvider({
            mnemonic: {
                phrase: commandLineArguments.mnemonic
            },
            providerOrUrl: `http://${commandLineArguments.node}`
        });
    }
    return provider
};

export const getBosonContract = async (): Promise<any> => {
    while (!bosonContract) {
        const commandLineArguments: Arguments = await getAsyncCommandLineArguments();
        const validWeb3 = await getWeb3();
        bosonContract = new validWeb3.eth.Contract(bosonProtocol.abi, commandLineArguments.address);
    }
    return bosonContract;
};

export const getWeb3 = async (): Promise<any> => {
    while (!web3) {
        web3 = new Web3(await getProvider());
    }
    return web3;
};



import {getWeb3} from "../services/web3";
import {ALLOWED_METHODS} from "../constants";


export const validateAddressInWeb3 = async (address: string): Promise<boolean> => {
    const web3 = await getWeb3();
    return web3.utils.isAddress(address);
};

export const validateMethod = (method: string) => {
    return ALLOWED_METHODS.includes(method);
};

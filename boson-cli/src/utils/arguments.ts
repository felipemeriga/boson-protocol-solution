import minimist from "minimist";
import {
    AddressArgumentError, AddressFormatError,
    MethodArgumentError,
    MnemonicArgumentError, UnknownMethod,
} from "../exception/exceptions";
import {validateAddressInWeb3, validateMethod} from "./helpers";
import {DEFAULT_NODE} from "../constants";

export interface Arguments {
    node: string;
    mnemonic: string;
    address: string;
    method: string
}

export let validatedArgs: Arguments;


export const getAsyncCommandLineArguments = async (): Promise<Arguments> => {
    if(validatedArgs) {
        return validatedArgs
    }

    const unvalidatedArguments: Arguments | any = minimist(process.argv.slice(2));
    unvalidatedArguments.method = unvalidatedArguments._[0];

    // Had to do this workaround because minimist converts HEX address to decimal
    const hexAddresArgument: string = process.argv.filter(s => s.includes('--address'))[0];
    if(hexAddresArgument) {
        unvalidatedArguments.address = hexAddresArgument.replace('--address=', '');
    } else {
        throw new AddressArgumentError('You have not provided an address as argument');
    }

    if(!unvalidatedArguments.mnemonic) {
        throw new MnemonicArgumentError('You have not provided a mnemonic as argument');
    }
    if(!unvalidatedArguments.method) {
        throw new MethodArgumentError('You have not provided a method, it has to be either pause, unpause, paused or owner');
    } else {
        if(!validateMethod(unvalidatedArguments.method)) {
            throw new UnknownMethod(`The method ${unvalidatedArguments.method} do not exist for the smart contract`)
        }
    }
    if(!unvalidatedArguments.node) {
        unvalidatedArguments.node = DEFAULT_NODE;
    }

    validatedArgs = unvalidatedArguments;

    return validatedArgs;
};



export const validateAddress =  async (address: string) => {
    if(!await validateAddressInWeb3(address)) {
        throw new AddressFormatError('The provided contract address does not have an ERC20 contract address format')
    }
};

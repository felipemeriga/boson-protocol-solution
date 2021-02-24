#!/usr/bin/env node

import chalk from 'chalk';
import {Arguments, getAsyncCommandLineArguments, validateAddress} from "./utils/arguments";
import {ValidationError} from "./exception/exceptions";
import {pause, paused, unpause} from "./services/contract_methods";

if (require.main === module) {
    (async () => {
        console.log(chalk.green.bold('Welcome to Boson CLI! \n'));
        const commandLineArguments: Arguments = await getAsyncCommandLineArguments();
        await validateAddress(commandLineArguments.address);
        if(commandLineArguments.method === 'status') {
            await paused();
        } else if(commandLineArguments.method === 'pause') {
            await pause();
        } else if(commandLineArguments.method === 'unpause') {
            await unpause();
        }
        process.exit();
    })().catch((err: any) => {
        if (err instanceof ValidationError) {
            console.log(chalk.yellow.bold(err.message));
        } else {
            console.error(chalk.red.bold(err.stack));
        }
        process.exit();
    })
}

process.on('uncaughtException', err => {
    console.error(`Uncaught Exception`, chalk.red.bold(err));
    process.exit(1);
});

process.on('unhandledRejection', err => {
    if (err) {
        console.error(`Unhandled Rejection`, chalk.red.bold(err));
    }
});



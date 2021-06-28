/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

import _ from "lodash";
import {Timer} from "../Timer";
import {ILogger} from "./ILogger";

export class ConsoleLogger implements ILogger {
    private constructor(private timer?: Timer) {}

    private async getBlockNumberLabel(): Promise<string> {
        const blockNumber = await this.timer?.getLastBlockNumber();
        const blockNumberLabel = this.timer ? `#${blockNumber}:` : "";
        return blockNumberLabel;
    }

    async info(...args: unknown[]): Promise<void> {
        const blockLabel = await this.getBlockNumberLabel();
        console.info(`\t${blockLabel} ${_.toString(args)}`);
    }

    async debug(...args: unknown[]): Promise<void> {
        const blockLabel = await this.getBlockNumberLabel();
        console.debug(`\t${blockLabel} ${_.toString(args)}`);
    }

    async error(...args: unknown[]): Promise<void> {
        const blockLabel = await this.getBlockNumberLabel();
        console.error(`\t${blockLabel} ${_.toString(args)}`);
    }

    static from(timer?: Timer): ILogger {
        return new ConsoleLogger(timer);
    }
}

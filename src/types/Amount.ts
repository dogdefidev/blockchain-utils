/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import _ from "lodash";
import {BigNumber as BigNumberJS} from "bignumber.js";
import { toDecimals, toUnits } from "utils/utils";

export class Amount {
    private constructor(private amount: string) {}

    getNumber(): number {
        return parseInt(this.amount);
    }

    getBigNumber(): BigNumberJS {
        return new BigNumberJS(this.amount);
    }

    getString(): string {
        return this.amount;
    }

    toString(): string {
        return this.getString();
    }

    toFixed(): string {
        return this.getBigNumber().toFixed(0);
    }

    toDecimals(decimals: number): BigNumberJS {
        return toDecimals(this.getNumber(), decimals);
    }

    toUnits(decimals: number): BigNumberJS {
        return toUnits(this.getBigNumber(), decimals);
    }

    static fromString(amount: string): Amount {
        return new Amount(amount);
    }

    static from(amount: number, factionDigits: number = 0): Amount {
        return new Amount(amount.toFixed(factionDigits));
    }

    static fromBigNumber(amount: BigNumberJS, factionDigits: number = 0): Amount {
        return new Amount(amount.toFixed(factionDigits));
    }
}

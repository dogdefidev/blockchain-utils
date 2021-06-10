/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import _ from "lodash";
import {BigNumber as BigNumberJS} from "bignumber.js";

export const toDecimals = (amount: number, decimals: number) => {
    return new BigNumberJS(amount).times(new BigNumberJS(10).pow(decimals));
};

export const toDecimalsFromString = (amount: string, decimals: number) => {
    return new BigNumberJS(amount).times(new BigNumberJS(10).pow(decimals));
};

export const toUnits = (amount: BigNumberJS, decimals: number) => {
    return new BigNumberJS(amount).div(new BigNumberJS(10).pow(decimals));
};

export const shortAddress = (address: string, length:number = 6) => {
    return address.substr(0, length) + '...' + address.substr(address.length - length);
};

export const stringToBytes32 = (ethers: any, value: string) =>
    ethers.utils.formatBytes32String(value);
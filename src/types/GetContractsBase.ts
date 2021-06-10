/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import {Contract} from "ethers";
import {INTERFACE_ERC20_NAME} from "../utils/consts";

export abstract class GetContractsBase {
    constructor(protected ethers: any) {}

    protected async getContractAt(name: string, address: string): Promise<Contract> {
        const contract = await this.ethers.getContractAt(name, address);
        return contract;
    }

    async getERC20Custom(address: string): Promise<Contract> {
        return (await this.getContractAt(INTERFACE_ERC20_NAME, address)) as Contract;
    }
}

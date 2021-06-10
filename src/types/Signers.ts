/* eslint-disable import/prefer-default-export */
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {AccountIndex} from "../types";
import {EMPTY_ADDRESS} from "../utils/consts";

export class Signers {
    constructor(private signers: SignerWithAddress[], private ownerIndex: number = 0) {
        if(signers.length <= ownerIndex) {
            throw new Error("Owner index exceeds total signers.");
        }
    }

    getOwner(): SignerWithAddress {
        return this.signers[this.ownerIndex];
    }

    getOwnerAddress(): string {
        return this.signers[this.ownerIndex].address;
    }

    getAllSigners(): Array<SignerWithAddress> {
        return this.signers;
    }

    getSigners(...indexes: number[]): Array<SignerWithAddress> {
        return this.signers.filter((_, index) => indexes.includes(index));
    }

    getSigner(index: number): SignerWithAddress {
        return this.signers[index];
    }

    getSignerBy(senderIndex: AccountIndex): SignerWithAddress {
        return this.signers[senderIndex.index];
    }

    getSignerAddress(index: number): string {
        if (index < 0) {
            return EMPTY_ADDRESS;
        }
        return this.signers[index].address;
    }

    getSignerAddressBy(senderIndex: AccountIndex): string {
        if (senderIndex.index < 0) {
            return EMPTY_ADDRESS;
        }
        return this.signers[senderIndex.index].address;
    }
}

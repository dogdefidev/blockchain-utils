/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import _ from "lodash";

export class Timer {
    constructor(private ethers: any) {}

    async getBlock(): Promise<any> {
        return this.ethers.provider.getBlock(await this.ethers.provider.getBlockNumber());
    }

    async getLastBlockNumber(): Promise<number> {
        const result = await this.ethers.provider.getBlockNumber();
        return parseInt(result.toString(), 10);
    }

    async getBlockNumberAndSum(blocks: number): Promise<number> {
        return parseInt((await this.getBlock()).number.toString(), 10) + blocks;
    }

    async getTimestamp(): Promise<number> {
        return parseInt((await this.getBlock()).timestamp.toString(), 10);
    }

    async getTimestampAndSum(seconds: number): Promise<number> {
        return (await this.getTimestamp()) + seconds;
    }

    async setNextBlockTime(time: number): Promise<void> {
        await this.ethers.provider.send("evm_setNextBlockTimestamp", [time]);
    }

    async mineNextBlock(): Promise<void> {
        await this.ethers.provider.send("evm_mine");
    }

    async impersonateAccount(address: string): Promise<void> {
        await this.ethers.provider.send("hardhat_impersonateAccount", [address]);
    }

    async stopImpersonatingAccount(address: string): Promise<void> {
        await this.ethers.provider.send("hardhat_stopImpersonatingAccount", [address]);
    }

    async takeSnapshot(): Promise<void> {
        await this.ethers.provider.send("evm_snapshot");
    }

    async revertToSnapshot(id: string): Promise<void> {
        await this.ethers.provider.send("evm_revert", [id]);
    }

    async reset(): Promise<void> {
        await this.ethers.provider.send("hardhat_reset");
    }

    async advanceBlockInSeconds(seconds: number): Promise<number> {
        const toTime = await this.getTimestampAndSum(seconds);
        if (seconds === 0) {
            return toTime;
        }
        try {
            await this.setNextBlockTime(toTime);
            await this.mineNextBlock();
            const newTimestamp = await this.getTimestamp();
            return newTimestamp;
        } catch (error) {
            console.log(error);
            new Promise((resolve, reject) => {
                this.ethers.provider.send(
                    {
                        jsonrpc: "2.0",
                        method: "evm_mine",
                        params: [toTime],
                        id: new Date().getTime(),
                    },
                    // async (_err:any, _result:any) => {
                    () => {
                        resolve("");
                    }
                );
            });
            return 0;
        }
    }

    async advanceBlocks(blocks: number, secondsPerBlock: number = 10): Promise<number> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        // eslint-disable-next-line no-underscore-dangle
        const initialBlockNumber = await this.getLastBlockNumber();
        for (const _block of _.range(0, blocks)) {
            await this.advanceBlockInSeconds(secondsPerBlock);
        }
        const finalBlockNumber = await this.getLastBlockNumber();
        console.log(
            `\tTimer: Advancing ${blocks} blocks: Initial: ${initialBlockNumber} - Current: ${finalBlockNumber}`
        );
        return finalBlockNumber;
    }
}

export type EthReceipt = {
    blockNumber: number;
    blockHash: string;
    contractAddress: string | undefined;
    cumulativeGasUsed: number;
    from: string;
    gasUsed: number;
    logsBloom: string;
    status: boolean;
    to: string | undefined;
    transactionHash: string;
    transactionIndex: number;
    events: any;
};

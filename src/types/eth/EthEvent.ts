export type EthEvent = {
    address: string;
    blockHash: string;
    blockNumber: number;
    logIndex: number;
    removed: boolean;
    transactionHash: string;
    transactionIndex: number;
    id: string;
    returnValues: any;
    event: string | undefined;
    signature: any;
    raw: any;
};

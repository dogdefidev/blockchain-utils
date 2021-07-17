export type EthBlock = {
    number: number;
    hash: string;
    parentHash: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionsRoot: string;
    stateRoot: string;
    receiptsRoot: string;
    miner: string;
    difficulty: string;
    extraData: string;
    gasLimit: number;
    gasUsed: number;
    timestamp: number;
    nonce: string;
    mixHash: string;
    size: string | undefined;
};
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import _ from "lodash";

export type ETH_NETWORKS = 'eth_mainnet' |
    'rinkeby' |
    'ropsten' |
    'kovan' |
    'goerli';

export type BSC_NETWORKS = 
    'bsc_mainnet' |
    'bsc_testnet';

export type FTM_NETWORKS = 
    'ftm_mainnet' |
    'ftm_testnet';

export type NETWORKS = 
    ETH_NETWORKS |
    BSC_NETWORKS |
    FTM_NETWORKS;

export const getAllNetworks = () => {
    const map = new Map<NETWORKS, Explorer>();
    map.set('rinkeby', Explorer.rinkeby());
    map.set("bsc_testnet", Explorer.bsc_testnet());
    map.set("bsc_mainnet", Explorer.bsc_mainnet());
    map.set("ftm_mainnet", Explorer.fantom_mainnet());
    return map;
};

export const getNetworkExplorer = (network: NETWORKS) => {
    const explorers = getAllNetworks();
    if (!explorers.has(network)) {
        throw new Error(`Explorer not found. Network: ${network}`);
    }
    return explorers.get(network) as Explorer;
};

export class Explorer {
    private constructor(
        private baseUrl: string,
        private network: string = "www",
        private protocol: string = "https://"
    ) {}

    getBaseUrl(): string {
        return `${this.protocol}${this.network}.${this.baseUrl}`;
    }

    getAddress(address: string): string {
        return `${this.getBaseUrl()}/address/${address}`;
    }

    getToken(address: string): string {
        return `${this.getBaseUrl()}/token/${address}`;
    }

    getTx(txHash: string): string {
        return `${this.getBaseUrl()}/tx/${txHash}`;
    }

    printTx(title: string, txHash: string) {
        console.log(`${title}: ${this.getTx(txHash)}`);
    }

    printAddress(title: string, address: string) {
        console.log(`${title}: ${this.getAddress(address)}`);
    }

    static bsc_mainnet(): Explorer {
        return new Explorer(`bscscan.com`);
    }

    static bsc_testnet(): Explorer {
        return new Explorer(`bscscan.com`, "testnet");
    }

    static fantom_mainnet(): Explorer {
        return new Explorer(`ftmscan.com`);
    }

    static rinkeby(): Explorer {
        return new Explorer(`etherscan.io`, "rinkeby");
    }
}

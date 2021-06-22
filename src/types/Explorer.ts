/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import _ from "lodash";

export type ETH_NETWORKS = 'eth_mainnet' |
    'eth_rinkeby' |
    'eth_ropsten' |
    'eth_kovan' |
    'eth_goerli';

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
    map.set('eth_mainnet', Explorer.eth_mainnet());
    map.set('eth_rinkeby', Explorer.eth_rinkeby());
    map.set('eth_ropsten', Explorer.eth_ropsten());
    map.set('eth_kovan', Explorer.eth_kovan());
    map.set('eth_goerli', Explorer.eth_goerli());
    map.set("bsc_testnet", Explorer.bsc_testnet());
    map.set("bsc_mainnet", Explorer.bsc_mainnet());
    map.set("ftm_mainnet", Explorer.fantom_mainnet());
    map.set("ftm_testnet", Explorer.fantom_testnet());
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

    static fantom_testnet(): Explorer {
        return new Explorer(`fantom.network`, 'explorer.testnet');
    }

    static eth_rinkeby(): Explorer {
        return new Explorer(`etherscan.io`, "rinkeby");
    }

    static eth_ropsten(): Explorer {
        return new Explorer(`etherscan.io`, "ropsten");
    }

    static eth_kovan(): Explorer {
        return new Explorer(`etherscan.io`, "kovan");
    }

    static eth_goerli(): Explorer {
        return new Explorer(`etherscan.io`, "goerli");
    }

    static eth_mainnet(): Explorer {
        return new Explorer(`etherscan.io`, "www");
    }
}

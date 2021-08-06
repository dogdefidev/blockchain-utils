/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */

import {Contract} from "ethers";
import { ContractDeployed, Explorer, getNetworkExplorer, NETWORKS } from "types";
import { EMPTY_ADDRESS } from "./consts";

export const emptyDeployedList = () => new Array<ContractDeployed>();

export const deployContract = async (
    params: {
        network: string;
        ethers: any;
        contracts: ContractDeployed[];
        customNetworks?: Map<NETWORKS, Explorer>;
    },
    name: string,
    deployer: any,
    args: any[]
): Promise<Contract> => {
    const explorer = getNetworkExplorer(
        params.network as NETWORKS,
        params.customNetworks || new Map<NETWORKS, Explorer>()
    );
    const argsAsString = args.map((arg) => arg.toString()).join(" ");
    const contractDeployer = await params.ethers.getContractFactory(name);
    console.log(`${name}: deploying with args: ${argsAsString}`);
    const contract = await contractDeployer.connect(deployer).deploy(...args);
    console.log(`Contract deployed at address: ${contract.address}`);
    await contract.deployed();
    const url = `${explorer.getAddress(contract.address)}`;
    console.log(`Contract URL: ${url}`);
    params.contracts.push({
        name,
        address: contract.address,
        url,
        verifyCli: `npx hardhat verify --network ${params.network} ${contract.address} ${argsAsString}`,
    });
    console.log();
    return contract as Contract;
};


export const addContractInfo = async (
    params: {
        network: string;
        ethers: any;
        contracts: ContractDeployed[];
        customNetworks?: Map<NETWORKS, Explorer>;
    },
    name: string,
    contract: Contract,
    args: any[]
): Promise<Contract> => {
    const explorer = getNetworkExplorer(
        params.network as NETWORKS,
        params.customNetworks || new Map<NETWORKS, Explorer>()
    );
    const argsAsString = args.map((arg) => arg.toString()).join(" ");
    console.log(`${name}: deploying with args: ${argsAsString}`);
    console.log(`Contract deployed at address: ${contract.address}`);
    const contractUrl = explorer.getAddress(contract.address);
    explorer.printAddress(`Contract URL: `, contract.address);
    params.contracts.push({
        name,
        address: contract.address,
        url: contractUrl,
        verifyCli: `npx hardhat verify --network ${params.network} ${contract.address} ${argsAsString}`,
    });
    console.log();
    return contract as Contract;
};

export const addTemplateContractInfo = async (
    params: {
        network: string;
        ethers: any;
        contracts: ContractDeployed[];
        customNetworks?: Map<NETWORKS, Explorer>;
    },
    name: string,
    args: any[]
): Promise<void> => {
    const explorer = getNetworkExplorer(
        params.network as NETWORKS,
        params.customNetworks || new Map<NETWORKS, Explorer>()
    );
    const argsAsString = args.map((arg) => arg.toString()).join(" ");
    console.log(`${name}: template with args: ${argsAsString}`);
    const contractAddress = EMPTY_ADDRESS;
    const url = explorer.getAddress(contractAddress);
    params.contracts.push({
        name,
        address: contractAddress,
        url,
        verifyCli: `npx hardhat verify --network ${params.network} ${contractAddress} ${argsAsString}`,
    });
    console.log();
};

export const deployTransparentProxy = async (
    params: {
        network: string;
        ethers: any;
        upgrades: any;
        contracts: ContractDeployed[];
        customNetworks?: Map<NETWORKS, Explorer>;
    },
    name: string,
    args: any[],
    initializer?: string,
): Promise<Contract> => {
    const explorer = getNetworkExplorer(
        params.network as NETWORKS,
        params.customNetworks || new Map<NETWORKS, Explorer>()
    );
    const argsAsString = args.map((arg) => arg.toString()).join(" ");
    
    const proxyDeployer = await params.ethers.getContractFactory(name);
    const options = initializer ? { initializer } : undefined;
    const proxyName = `${name}Proxy`;

    console.log(`${proxyName}: deploying PROXY (${JSON.stringify(options)}) with args: ${argsAsString}`);
    const proxy = await params.upgrades.deployProxy(
        proxyDeployer,
        args,
        options,
    );
    console.log(`${name}Proxy: deployed at address: ${explorer.getAddress(proxy.address)}`);
    
    await addContractInfo(params, proxyName, proxy, args);
    await addTemplateContractInfo(params, name, []);

    console.log();
    return proxy;
};

import _ from 'lodash';
import { EMPTY_ADDRESS, EMPTY_STRING } from 'utils';

export type ContractInfo = {
  name: string;
  address: string;
  url: string;
  verifyCli: string;
};

export const EMPTY_CONTRACT_INFO: ContractInfo = {
  name: EMPTY_STRING,
  address: EMPTY_ADDRESS,
  url: '',
  verifyCli: '',
};

export const toContractsInfoMap = (contracts: ContractInfo[]) => _.reduce(
  contracts,
  (acc, { name, ...others }) => ({ ...acc, [name]: {...others, name, } }),
  {}
)
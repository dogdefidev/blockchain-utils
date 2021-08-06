import { EMPTY_ADDRESS, EMPTY_STRING } from 'utils';

export type ContractInfo = {
  name: string;
  address: string;
  url: string;
};

export const EMPTY_CONTRACT_INFO: ContractInfo = {
  name: EMPTY_STRING,
  address: EMPTY_ADDRESS,
  url: '',
};

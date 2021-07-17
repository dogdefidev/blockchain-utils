import { EMPTY_ADDRESS } from 'utils';

export type ContractInfo = {
  name: string;
  address: string;
  url: string;
};

export const EMPTY_CONTRACT_INFO: ContractInfo = {
  name: 'Empty',
  address: EMPTY_ADDRESS,
  url: '',
};

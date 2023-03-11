declare type OptionContractTypes = 'Put' | 'Call';
declare type OptionContractStatuses =
  | 'Open'
  | 'Closed'
  | 'Pending'
  | 'Expired'
  | 'Assigned';

declare type Option = {
  ticker: string;
  type: OptionContractTypes;
  quantity: number;
  strike: number;
  expiry: Date;
  open_premium: number;
  open_date: Date;
  cost_basis: number;
  delta: number;
  gamma: number;
  vega: number;
  theta: number;
  rho: number;
  iv: number;
  status: OptionContractStatuses;
  close_premium?: number;
  close_date?: Date;
  profit: number;
};

declare interface OptionModel extends Option {
  id: number;
}

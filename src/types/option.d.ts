declare enum OptionContractType {
  PUT = 'PUT',
  CALL = 'CALL',
}

declare enum OptionContractStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  ASSIGNED = 'ASSIGNED',
}

declare type Option = {
  ticker: string;
  type: OptionContractType;
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
  status: OptionContractStatus;
  close_premium?: number;
  close_date?: Date;
  profit: number;
};

declare enum BankType {
  CHECKING = 'Checking',
  SAVINGS = 'Savings',
  CREDIT = 'Credit',
  BROKERAGE = 'Brokerage',
  RETIREMENT_401k = '401k',
  RETIREMENT_ROTH_401k = 'ROTH 401k',
  RETIREMENT_IRA = 'IRA',
  RETIREMENT_ROTH_IR = 'ROTH IRA',
}

declare type Bank = {
  name: string;
  type: BankType;
  total: number;
  lastMonthTotal: number;
};

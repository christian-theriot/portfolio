declare type BankTypes =
  | 'Checking'
  | 'Savings'
  | 'Credit'
  | 'Brokerage'
  | '401k'
  | 'Roth 401k'
  | 'IRA'
  | 'Roth IRA';

declare type Bank = {
  name: string;
  type: BankTypes;
  total: number;
  lastMonthTotal: number;
};

declare interface BankModel extends Bank {
  id: number;
}

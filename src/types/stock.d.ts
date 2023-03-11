declare type Stock = {
  ticker: string;
  shares: number;
  open_date: Date;
  open_price: number;
  dividend: number;
  cost_basis: number;
  close_date?: Date;
  close_price?: number;
  current_price: number;
  mark_to_market: number;
};

declare interface StockModel extends Stock {
  id: number;
}

import { Sql } from 'postgres';
import { sql } from '../../services';

export class Stock {
  static async exists(sql: Sql) {
    const [{ exists }] = await sql<
      [{ exists: boolean }]
    >`select exists(select from pg_tables where tablename='stock');`;

    return exists;
  }

  static async create({
    ticker,
    shares,
    open_date,
    open_price,
    dividend,
    cost_basis,
    close_date,
    close_price,
    current_price,
    mark_to_market,
  }: {
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
  }): Promise<StockModel> {
    const id = await sql.begin(async (sql) => {
      await sql`create table if not exists stock(id bigserial primary key,ticker text not null,shares int not null,open_date date not null,open_price real not null,dividend real not null,cost_basis real not null,close_date date,close_price real,current_price real not null,mark_to_market real not null);`;

      const [{ id }] = await sql`insert into stock${sql(
        {
          ticker,
          shares,
          open_date,
          open_price,
          dividend,
          cost_basis,
          close_date: close_date ?? null,
          close_price: close_price ?? null,
          current_price,
          mark_to_market,
        },
        'ticker',
        'shares',
        'open_date',
        'open_price',
        'dividend',
        'cost_basis',
        'close_date',
        'close_price',
        'current_price',
        'mark_to_market'
      )} returning id;`;

      return parseInt(id);
    });

    return {
      id,
      ticker,
      shares,
      open_date,
      open_price,
      dividend,
      cost_basis,
      close_date,
      close_price,
      current_price,
      mark_to_market,
    };
  }

  static async load(id: number): Promise<StockModel | undefined> {
    return await sql.begin(async (sql) => {
      const exists = await this.exists(sql);

      if (exists) {
        const [model] = await sql`select * from stock where id=${id};`;

        if (model) {
          return {
            id: parseInt(model['id']),
            ticker: model['ticker'],
            shares: parseInt(model['shares']),
            open_date: model['open_date'],
            open_price: parseFloat(model['open_price']),
            dividend: parseFloat(model['dividend']),
            cost_basis: parseFloat(model['cost_basis']),
            close_date: model['close_date'],
            close_price: model['close_price']
              ? parseFloat(model['close_price'])
              : undefined,
            current_price: parseFloat(model['current_price']),
            mark_to_market: parseFloat(model['mark_to_market']),
          };
        }
      }

      return undefined;
    });
  }

  static async delete(id: number) {
    await sql`delete from stock where id=${id};`;
  }
}

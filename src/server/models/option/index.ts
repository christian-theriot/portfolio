import { Sql } from 'postgres';
import { sql } from '../../services';

export enum OptionContractType {
  CALL = 'Call',
  PUT = 'Put',
}

export enum OptionContractStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
  EXPIRED = 'Expired',
  ASSIGNED = 'Assigned',
}

export class Option {
  static async exists(sql: Sql) {
    const [{ exists }] = await sql<
      [{ exists: boolean }]
    >`select exists(select from pg_tables where tablename='option');`;

    return exists;
  }

  static async create({
    ticker,
    type,
    quantity,
    strike,
    expiry,
    open_premium,
    open_date,
    cost_basis,
    delta,
    gamma,
    vega,
    theta,
    rho,
    iv,
    status,
    close_premium,
    close_date,
    profit,
  }: {
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
  }) {
    const id = await sql.begin(async (sql) => {
      await sql`create table if not exists option(id bigserial primary key,ticker text not null,type text not null,quantity int not null,strike real not null,expiry date not null,open_premium real not null,open_date date not null,cost_basis real not null,delta real not null,gamma real not null,vega real not null,theta real not null,rho real not null,iv real not null,status text not null,close_premium real,close_date date,profit real not null);`;

      const [{ id }] = await sql`insert into option ${sql(
        {
          ticker,
          type,
          quantity,
          strike,
          expiry,
          open_premium,
          open_date,
          cost_basis,
          delta,
          gamma,
          vega,
          theta,
          rho,
          iv,
          status,
          close_premium: close_premium ?? null,
          close_date: close_date ?? null,
          profit,
        },
        'ticker',
        'type',
        'quantity',
        'strike',
        'expiry',
        'open_premium',
        'open_date',
        'cost_basis',
        'delta',
        'gamma',
        'vega',
        'theta',
        'rho',
        'iv',
        'status',
        'close_premium',
        'close_date',
        'profit'
      )} returning id;`;

      return parseInt(id);
    });

    return {
      id,
      ticker,
      type,
      quantity,
      strike,
      expiry,
      open_premium,
      open_date,
      cost_basis,
      delta,
      gamma,
      vega,
      theta,
      rho,
      iv,
      status,
      close_premium,
      close_date,
      profit,
    };
  }

  static async load(id: number): Promise<OptionModel | undefined> {
    return await sql.begin(async (sql) => {
      const exists = await this.exists(sql);

      if (exists) {
        const [model] = await sql`select * from option where id=${id};`;

        if (model) {
          return {
            id: parseInt(model['id']),
            ticker: model['ticker'],
            type: model['type'],
            quantity: parseInt(model['quantity']),
            strike: parseFloat(model['strike']),
            expiry: model['expiry'],
            open_premium: parseFloat(model['open_premium']),
            open_date: model['open_date'],
            cost_basis: parseFloat(model['cost_basis']),
            delta: parseFloat(model['delta']),
            gamma: parseFloat(model['gamma']),
            vega: parseFloat(model['vega']),
            theta: parseFloat(model['theta']),
            rho: parseFloat(model['rho']),
            iv: parseFloat(model['iv']),
            status: model['status'],
            close_premium: model['close_premium']
              ? parseFloat(model['close_premium'])
              : undefined,
            close_date: model['close_date'],
            profit: parseFloat(model['profit']),
          };
        }
      }

      return undefined;
    });
  }

  static async delete(id: number) {
    await sql`delete from option where id=${id};`;
  }
}

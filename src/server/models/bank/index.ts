import { Sql } from 'postgres';
import { sql } from '../../services';

export enum BankType {
  CHECKING = 'Checking',
  SAVINGS = 'Savings',
  CREDIT = 'Credit',
  BROKERAGE = 'Brokerage',
  RETIREMENT_401k = '401k',
  RETIREMENT_ROTH_401k = 'Roth 401k',
  RETIREMENT_IRA = 'IRA',
  RETIREMENT_ROTH_IR = 'Roth IRA',
}

export class Bank {
  /**
   * Check if the `bank` table exists
   * @param sql The sql implementation to use, in case that it is using transactions
   * @returns boolean
   */
  static async exists(sql: Sql) {
    const [{ exists }] = await sql<
      [{ exists: boolean }]
    >`select exists(select from pg_tables where tablename='bank');`;

    return exists;
  }

  /**
   * Create a new bank row, as well as the table if it does not exist yet
   */
  static async create({
    name,
    type,
    total,
    lastMonthTotal,
  }: {
    name: string;
    type: BankTypes;
    total: number;
    lastMonthTotal: number;
  }): Promise<BankModel> {
    const id = await sql.begin(async (sql) => {
      await sql`create table if not exists bank(id bigserial primary key,name TEXT NOT NULL,type TEXT NOT NULL,total REAL NOT NULL,last_month_total REAL NOT NULL);`;

      const [{ id }] = await sql`insert into bank ${sql(
        {
          name,
          type,
          total,
          last_month_total: lastMonthTotal,
        },
        'name',
        'type',
        'total',
        'last_month_total'
      )} returning id;`;

      return parseInt(id);
    });

    return { id, name, type, total, lastMonthTotal };
  }

  /**
   * Loads a single row from the `bank` table
   *
   * @param id The id of the row to load
   * @return BankModel
   */
  static async load(id: number): Promise<BankModel | undefined> {
    return await sql.begin(async (sql) => {
      const exists = await this.exists(sql);

      if (exists) {
        const [model] = await sql`select * from bank where id=${id};`;

        if (model) {
          return {
            id: parseInt(model['id']),
            name: model['name'],
            type: model['type'],
            total: parseFloat(model['total']),
            lastMonthTotal: parseFloat(model['last_month_total']),
          };
        }
      }

      return undefined;
    });
  }

  /**
   * Remove a row from the `bank` table given its id
   *
   * @param id The id of the row to delete
   */
  static async delete(id: number) {
    await sql`delete from bank where id=${id};`;
  }
}

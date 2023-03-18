import { sql } from '../../services';

export class AccountModel {
  static async setup() {
    await sql`CREATE TABLE IF NOT EXISTS account(id BIGSERIAL PRIMARY KEY,name TEXT NOT NULL,type TEXT NOT NULL);`;
  }

  static async teardown() {
    await sql`DROP TABLE IF EXISTS account CASCADE;`;
  }

  static async create({
    name,
    type,
  }: {
    name: string;
    type: string;
  }): Promise<Account> {
    return await sql.begin(async (sql) => {
      const [{ id }] = await sql`INSERT INTO account ${sql(
        { name, type },
        'name',
        'type'
      )} RETURNING id;`;

      return { id: parseInt(id), name, type };
    });
  }

  static async update(acct: Account) {
    await sql.begin(async (sql) => {
      const [{ exists }] =
        await sql`SELECT EXISTS (SELECT FROM account WHERE id=${acct.id});`;

      if (exists) {
        await sql`UPDATE account SET name=${acct.name}, type=${acct.type} WHERE id=${acct.id};`;
      } else {
        await sql`INSERT INTO account ${(sql(acct), 'id', 'name', 'type')};`;
      }
    });
  }

  static async get(id: number): Promise<Account | undefined> {
    return await sql.begin(async (sql) => {
      const [row] = await sql`SELECT * FROM account WHERE id=${id};`;

      if (row) {
        return {
          id: parseInt(row['id']),
          name: row['name'],
          type: row['type'],
        };
      } else {
        return;
      }
    });
  }

  static async delete(id: number) {
    await sql`DELETE FROM account WHERE id=${id};`;
  }
}

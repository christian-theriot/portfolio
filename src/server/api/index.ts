import { sql } from '../services';

export class API {
  constructor() {}

  async createDB(name: string) {
    await sql`CREATE TABLE ${sql.unsafe(
      name
    )}(id bigserial primary key, name text unique not null);`;
  }

  async getDB(name: string) {
    return await sql`SELECT id,name FROM ${sql.unsafe(name)};`;
  }

  async putDB(name: string, data: string) {
    return await sql`INSERT INTO ${sql.unsafe(
      name
    )}(name) values(${data}) returning id;`;
  }

  async deleteDB(name: string) {
    return await sql`DROP TABLE ${sql.unsafe(name)};`;
  }
}

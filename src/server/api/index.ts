import { buildSchema, graphql } from 'graphql';
import { sql } from '../services';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AccountModel } from './account';

export * from './account';

export class API {
  constructor() {}

  async setup() {
    await AccountModel.setup();
  }

  async teardown() {
    await AccountModel.teardown();
  }

  async run(query: string, variables?: any) {
    return await graphql({
      schema: buildSchema(
        readFileSync(
          join(__dirname, '..', '..', '..', 'schema.graphqls')
        ).toString()
      ),
      rootValue: {
        healthcheck: async () => {
          const [{ exists }] = await sql`select exists(select from pg_tables);`;
          return exists;
        },
        create_account: AccountModel.create,
        update_account: AccountModel.update,
        get_account: AccountModel.get,
        delete_account: AccountModel.delete,
      },
      source: query,
      variableValues: variables,
    });
  }
}

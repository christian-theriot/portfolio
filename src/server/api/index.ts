import { buildSchema, graphql } from 'graphql';
import { sql } from '../services';
import { readFileSync } from 'fs';
import { join } from 'path';

export class API {
  constructor() {}

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
      },
      source: query,
      variableValues: variables,
    });
  }
}

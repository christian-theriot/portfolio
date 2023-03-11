import { sql } from './services';

beforeAll(async () => {
  await sql`set client_min_messages = 'ERROR';`;
});

afterAll(async () => {
  await sql`drop table if exists bank cascade;`;
  await sql.end({ timeout: 1 });
});

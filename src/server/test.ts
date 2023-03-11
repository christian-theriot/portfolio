import { sql } from './services';

beforeAll(async () => {
  await sql`set client_min_messages = 'ERROR';`;
});

afterAll(async () => {
  await sql`drop table if exists bank cascade;`;
  await sql`drop table if exists stock cascade;`;
  await sql`drop table if exists option cascade;`;
  await sql.end();
});

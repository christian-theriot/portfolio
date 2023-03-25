import postgres from 'postgres';
import { config } from 'dotenv';

config();

export const sql = postgres({
  host: process.env['POSTGRES_HOST'],
  port: parseInt(`${process.env['POSTGRES_PORT']}`),
  user: process.env['POSTGRES_USER'],
  pass: process.env['POSTGRES_PASSWORD'],
  db: process.env['POSTGRES_DB'],
});

export default { sql };

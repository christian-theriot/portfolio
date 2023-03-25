import { API } from './api';
import { sql } from './services';

const api = new API();

beforeAll(async () => {
  await api.setup();
});

afterAll(async () => {
  await api.teardown();
  await sql.end();
});

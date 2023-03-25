import { API } from './api';
import { sql } from './services';

beforeAll(async () => {
  await API.setup();
});

afterAll(async () => {
  await API.teardown();
  await sql.end();
});

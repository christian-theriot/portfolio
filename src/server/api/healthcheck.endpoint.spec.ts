import express, { Express } from 'express';
import supertest from 'supertest';
import { API } from '.';

describe('Healthcheck Middleware', () => {
  let app: Express;

  beforeAll((done) => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    app = express();
    app.use(express.json());
    new API(app, done);
  });

  it('can query healthcheck with GET', async () => {
    await supertest(app).get('/api/healthcheck').expect(200).expect('OK');
  });
});

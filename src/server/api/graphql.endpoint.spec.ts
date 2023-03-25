import { ProfileModel } from '../models';
import express, { Express } from 'express';
import supertest from 'supertest';
import { API } from '.';

describe('GraphQL Middleware', () => {
  let app: Express;

  beforeAll((done) => {
    jest.spyOn(console, 'log').mockImplementationOnce(() => {});
    app = express();
    app.use(express.json());
    new API(app, done);
  });

  it('can query healthcheck with GET', async () => {
    await supertest(app)
      .get('/api/graphql?query=query{healthcheck}')
      .expect(200)
      .expect({ data: { healthcheck: true } });
  });
  it('can query healthcheck', async () => {
    await supertest(app)
      .post('/api/graphql')
      .send({ query: 'query{healthcheck}' })
      .expect(200)
      .expect({ data: { healthcheck: true } });
  });
  it('can mutate signUp', async () => {
    jest
      .spyOn(ProfileModel, 'create')
      .mockReturnValueOnce(
        Promise.resolve(
          new ProfileModel({ id: 1, email: 'test', password: 'test' })
        )
      );

    await supertest(app)
      .get(
        '/api/graphql?mutation=mutation{signUp(email:"test" password:"test"){id email password}}'
      )
      .expect(200)
      .expect({ data: { signUp: { id: 1, email: 'test', password: 'test' } } });
  });
});

import { sql } from '../services';
import { Express } from 'express';
import { GraphQLEndpoint } from './graphql';
import { HealthCheckEndpoint } from './healthcheck';

export class API {
  constructor(app: Express, afterInit?: () => void) {
    this.setup().then(() => {
      console.log('Initialized Database');

      new GraphQLEndpoint(app);
      new HealthCheckEndpoint(app);

      afterInit?.();
    });
  }

  async setup() {
    await sql`set client_min_messages = 'ERROR';`;
  }

  async teardown() {}
}

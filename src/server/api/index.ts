import { sql } from '../services';
import { Express } from 'express';
import { GraphQLEndpoint } from './graphql';
import { HealthCheckEndpoint } from './healthcheck';

export class API {
  constructor(app: Express, afterInit?: () => void) {
    API.setup().then(() => {
      console.log('Initialized Database');

      new GraphQLEndpoint(app);
      new HealthCheckEndpoint(app);

      afterInit?.();
    });
  }

  static async setup() {
    await sql`set client_min_messages = 'ERROR';`;
  }

  static async teardown() {}
}

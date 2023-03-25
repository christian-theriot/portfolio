import { sql } from '../services';
import { Express } from 'express';
import { GraphQLEndpoint } from './graphql';
import { HealthCheckEndpoint } from './healthcheck';
import { ProfileModel } from '../models';

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
    await sql`CREATE SCHEMA IF NOT EXISTS portfolio;`;
    await ProfileModel.setup();
  }

  static async teardown() {
    await ProfileModel.teardown();
    await sql`DROP SCHEMA portfolio CASCADE;`;
  }
}

import { Express, Request, Response } from 'express';
import { buildSchema, graphql } from 'graphql';
import { sql } from '../services';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export class GraphQLEndpoint implements APIEndpoint<Request, Response> {
  constructor(app: Express) {
    app.use('/api/graphql', this.endpoint);
  }

  endpoint(req: Request, res: Response) {
    const filename = join(__dirname, '..', '..', '..', 'schema.graphqls');

    /* istanbul ignore next */
    const fileExists = existsSync(filename)
      ? readFileSync(filename).toString()
      : undefined;

    /* istanbul ignore if */
    if (!fileExists) {
      res.status(503).send('Service Unavailable');
      return;
    }

    graphql({
      schema: buildSchema(fileExists),
      rootValue: {
        healthcheck: async () => {
          const [{ exists }] = await sql`select exists(select from pg_tables);`;
          return exists;
        },
      },
      source: req.query['query'] ?? req.body.query,
    })
      .then((data) => res.status(200).send(data))
      .catch(/* istanbul ignore next */ (err) => res.status(500).send(err));
  }
}

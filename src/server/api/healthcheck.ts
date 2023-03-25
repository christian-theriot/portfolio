import { Express, Request, Response } from 'express';

export class HealthCheckEndpoint implements APIEndpoint<Request, Response> {
  constructor(app: Express) {
    app.get('/api/healthcheck', this.endpoint);
  }

  endpoint(_: Request, res: Response) {
    res.status(200).send('OK');
  }
}

declare interface APIEndpoint<REQ, RES> {
  endpoint(req: REQ, res: RES): void;
}

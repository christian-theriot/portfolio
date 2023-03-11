import { Option, OptionContractStatus, OptionContractType } from '.';

describe('Option model', () => {
  it('can create', async () => {
    const model = await Option.create({
      ticker: 'SPY',
      type: OptionContractType.PUT,
      quantity: 1,
      strike: 400,
      expiry: new Date(),
      open_premium: 1,
      open_date: new Date(),
      cost_basis: 399,
      delta: -0.4,
      gamma: 0.4,
      vega: 1,
      theta: 1,
      rho: 1,
      iv: 1,
      status: OptionContractStatus.CLOSED,
      close_premium: 1,
      close_date: new Date(),
      profit: 1,
    });

    expect(model).toBeDefined();
    expect(model.id).toBe(1);
  });

  it('can get a model by id', async () => {
    const model = await Option.load(1);

    expect(model?.ticker).toBe('SPY');
    expect(model?.type).toBe(OptionContractType.PUT);
  });

  it('can get an option where close_price is undefined', async () => {
    await Option.create({
      ticker: 'SPY',
      type: OptionContractType.PUT,
      quantity: 1,
      strike: 400,
      expiry: new Date(),
      open_premium: 1,
      open_date: new Date(),
      cost_basis: 399,
      delta: -0.4,
      gamma: 0.4,
      vega: 1,
      theta: 1,
      rho: 1,
      iv: 1,
      status: OptionContractStatus.ASSIGNED,
      profit: -1,
    });
    const model = await Option.load(2);

    expect(model).toBeDefined();
    expect(model?.id).toBe(2);
  });

  it('can delete an entry from the table', async () => {
    await Option.delete(1);
    expect(await Option.load(1)).toBeUndefined();
  });
});

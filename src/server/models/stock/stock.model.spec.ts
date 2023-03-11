import { Stock } from '.';

describe('Stock model', () => {
  it('can create', async () => {
    const model = await Stock.create({
      ticker: 'SPY',
      shares: 1,
      open_date: new Date(),
      open_price: 360,
      dividend: 0,
      cost_basis: 360,
      current_price: 360,
      mark_to_market: 0,
    });

    expect(model).toBeDefined();
    expect(model.id).toBe(1);
  });

  it('can get a model by id', async () => {
    const model = await Stock.load(1);

    expect(model?.ticker).toBe('SPY');
    expect(model?.shares).toBe(1);
  });

  it('can get a stock where close_price is defined', async () => {
    await Stock.create({
      ticker: 'QQQ',
      shares: 1,
      open_date: new Date(),
      open_price: 360,
      dividend: 0,
      cost_basis: 360,
      close_date: new Date(),
      close_price: 360,
      current_price: 360,
      mark_to_market: 0,
    });

    const model = await Stock.load(2);

    expect(model?.close_price).toBe(360);
  });

  it('can delete an entry from the table', async () => {
    await Stock.delete(1);
    expect(await Stock.load(1)).toBeUndefined();
  });
});

import { Bank, BankType } from '.';

describe('Bank model', () => {
  it('can create', async () => {
    const model = await Bank.create({
      name: 'test',
      type: BankType.CHECKING,
      total: 0,
      lastMonthTotal: 0,
    });

    expect(model).toBeDefined();
    expect(model.id).toBe(1);
  });

  it('can get a model by id', async () => {
    const model = await Bank.load(1);

    expect(model?.name).toBe('test');
    expect(model?.type).toBe(BankType.CHECKING);
  });

  it('can delete an entry from the table', async () => {
    await Bank.delete(1);
    expect(await Bank.load(1)).toBeUndefined();
  });
});

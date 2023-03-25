import { ProfileModel } from '.';

describe('Profile Model', () => {
  it('can check if table exists', async () => {
    const exists = await ProfileModel.exists();

    expect(exists).toBeTruthy();
  });

  it('can create a new row', async () => {
    const profile = await ProfileModel.create({
      email: 'test',
      password: 'test',
    });

    expect(profile).toBeDefined();
    expect(profile?.id).toBe(1);
  });

  it('must have a unique email to create a row', async () => {
    const profile = await ProfileModel.create({
      email: 'test',
      password: 'will be undefined',
    });

    expect(profile).toBeUndefined();
  });

  it('can get an existing row', async () => {
    const profile = await ProfileModel.get({ id: 1 });

    expect(profile).toBeDefined();
    expect(profile?.email).toBe('test');
    expect(profile?.password).toBe('test');
  });

  it('can verify an email and password combo', async () => {
    const profile = await ProfileModel.verify({
      email: 'test',
      password: 'test',
    });

    expect(profile).toBeTruthy();
  });

  it('can falsify an email and password combo', async () => {
    const profile = await ProfileModel.verify({
      email: 'test',
      password: 'invalid',
    });

    expect(profile).toBeFalsy();
  });

  it('can delete an existing row', async () => {
    const profile = await ProfileModel.get({ id: 1 });
    const id = await profile?.delete();

    expect(id).toBe(1);
  });

  it('deleting a non-existant row does nothing', async () => {
    const profile = new ProfileModel({
      id: 1,
      email: 'test',
      password: 'test',
    });
    const id = await profile.delete();

    expect(id).toBeUndefined();
  });

  it('getting a non-existant row returns undefined', async () => {
    const profile = await ProfileModel.get({ id: 1 });

    expect(profile).toBeUndefined();
  });

  it('calling verify on a non-existant row returns false', async () => {
    const profile = await ProfileModel.verify({
      email: 'test',
      password: 'test',
    });

    expect(profile).toBeFalsy();
  });

  it('calling verify if the table does not exist would return false', async () => {
    await ProfileModel.teardown();

    const profile = await ProfileModel.verify({
      email: 'test',
      password: 'test',
    });

    expect(profile).toBeFalsy();
  });
});

import { GraphQL } from '.';
import { ProfileModel } from '../../../models';

describe('Profile GraphQL API', () => {
  it('can signUp', async () => {
    jest
      .spyOn(ProfileModel, 'create')
      .mockReturnValueOnce(
        Promise.resolve(
          new ProfileModel({ id: 1, email: 'test', password: 'test' })
        )
      );

    const profile = await GraphQL.Profile.signUp({
      email: 'test',
      password: 'test',
    });

    expect(profile?.id).toBe(1);
  });

  it('can login', async () => {
    jest.spyOn(ProfileModel, 'verify').mockReturnValueOnce(Promise.resolve(1));
    jest
      .spyOn(ProfileModel, 'get')
      .mockReturnValueOnce(
        Promise.resolve(
          new ProfileModel({ id: 1, email: 'test', password: 'test' })
        )
      );

    const profile = await GraphQL.Profile.login({
      email: 'test',
      password: 'test',
    });

    expect(profile?.id).toBe(1);
  });

  it('can fail to login', async () => {
    const profile = await GraphQL.Profile.login({
      email: 'test',
      password: 'test',
    });

    expect(profile).toBeUndefined();
  });

  it('can delete a profile', async () => {
    jest
      .spyOn(ProfileModel, 'get')
      .mockReturnValueOnce(
        Promise.resolve(
          new ProfileModel({ id: 1, email: 'test', password: 'test' })
        )
      );
    jest
      .spyOn(ProfileModel.prototype, 'delete')
      .mockReturnValueOnce(Promise.resolve(1));

    const profile = await GraphQL.Profile.delete({ id: 1 });

    expect(profile).toBe(1);
  });
});

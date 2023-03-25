import { ProfileModel } from '../../../models';

export namespace GraphQL {
  export class Profile {
    static async signUp({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) {
      return await ProfileModel.create({ email, password });
    }

    static async login({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) {
      const id = await ProfileModel.verify({ email, password });
      if (id) {
        return await ProfileModel.get({ id });
      }

      return undefined;
    }

    static async delete({ id }: { id: number }) {
      const profile = await ProfileModel.get({ id });
      return await profile?.delete();
    }
  }
}

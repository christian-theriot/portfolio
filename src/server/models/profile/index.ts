import { sql } from '../../services';

export class ProfileModel {
  constructor(private _model: Profile) {}

  get id() {
    return this._model.id;
  }

  get email() {
    return this._model.email;
  }

  get password() {
    return this._model.password;
  }

  static async setup() {
    await sql`CREATE TABLE IF NOT EXISTS portfolio.profile(id BIGSERIAL PRIMARY KEY,email TEXT UNIQUE NOT NULL,password TEXT NOT NULL);`;
  }

  static async teardown() {
    await sql`DROP TABLE IF EXISTS portfolio.profile CASCADE;`;
  }

  static async exists(): Promise<boolean> {
    return await sql.begin(async (sql) => {
      const [{ exists }] =
        await sql`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname='portfolio' AND tablename='profile');`;

      return exists;
    });
  }

  static async create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    if (await ProfileModel.exists()) {
      const id = await sql.begin(async (sql) => {
        const [{ exists }] =
          await sql`SELECT EXISTS (SELECT FROM portfolio.profile WHERE email=${email});`;

        if (exists) {
          return undefined;
        }

        const [{ id }] = await sql`INSERT INTO portfolio.profile ${sql(
          { email, password },
          'email',
          'password'
        )} RETURNING id;`;

        return parseInt(id);
      });

      if (id) {
        return new ProfileModel({ id, email, password });
      }
    }

    return undefined;
  }

  static async get({ id }: { id: number }) {
    if (await ProfileModel.exists()) {
      const profile = await sql.begin(async (sql) => {
        const [row] =
          await sql`SELECT email,password FROM portfolio.profile WHERE id=${id};`;

        if (row) {
          return new ProfileModel({
            id,
            email: row['email'],
            password: row['password'],
          });
        }

        return;
      });

      if (profile) {
        return profile;
      }
    }

    return;
  }

  static async verify({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    if (await ProfileModel.exists()) {
      return await sql.begin(async (sql) => {
        const [row] =
          await sql`SELECT * FROM portfolio.profile WHERE email=${email};`;

        if (row) {
          return password === row['password'] ? parseInt(row['id']) : false;
        }

        return false;
      });
    }

    return false;
  }

  async delete() {
    return await sql.begin(async (sql) => {
      const [row] =
        await sql`DELETE FROM portfolio.profile CASCADE WHERE id=${this._model.id} RETURNING id;`;

      return row?.['id'] ? parseInt(row['id']) : undefined;
    });
  }
}

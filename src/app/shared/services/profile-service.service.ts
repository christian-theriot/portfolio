import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apollo: Apollo) {}

  signUp({ email, password }: { email: string; password: string }) {
    return this.apollo
      .mutate<{ signUp: { id: number; email: string; password: string } }>({
        mutation: gql`
          mutation SignUp($email: String!, $password: String!) {
            signUp(email: $email, password: $password) {
              id
              email
            }
          }
        `,
        variables: { email, password },
      })
      .pipe(
        map(({ data }) =>
          data?.signUp
            ? { id: data.signUp.id, email: data.signUp.email }
            : undefined
        ),
        catchError((err) => {
          console.error(err);

          return of(undefined);
        })
      );
  }

  login({ email, password }: { email: string; password: string }) {
    return this.apollo
      .watchQuery<{ login: { id: Number; email: string; password: string } }>({
        query: gql`
          query LogIn($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              id
              email
              password
            }
          }
        `,
        variables: { email, password },
        fetchPolicy: 'cache-and-network',
      })
      .valueChanges.pipe(
        map(
          ({
            data: {
              login: { id, email },
            },
          }) => ({ id, email })
        )
      );
  }
}

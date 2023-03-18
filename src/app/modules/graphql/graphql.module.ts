import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';

const APOLLO_CACHE = new InjectionToken<InMemoryCache>('apollo-cache');

@NgModule({
  declarations: [],
  imports: [CommonModule, ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_CACHE,
      useValue: new InMemoryCache(),
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink, cache: InMemoryCache) {
        return {
          link: httpLink.create({ uri: '/api/graphql' }),
          cache,
        };
      },
      deps: [HttpLink, APOLLO_CACHE],
    },
  ],
})
export class GraphQLModule {}

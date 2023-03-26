import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './modules/routing/routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './modules/graphql/graphql.module';
import { PageComponent } from './components/pages/page.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProfileService } from './shared/services/profile-service.service';
import { SignUpPageComponent } from './components/pages/profile/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './components/pages/profile/sign-in-page/sign-in-page.component';

@NgModule({
  declarations: [AppComponent, PageComponent, MenuComponent, HomePageComponent, SignUpPageComponent, SignInPageComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RoutingModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent],
})
export class AppModule {}

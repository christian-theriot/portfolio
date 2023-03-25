import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './modules/routing/routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './modules/graphql/graphql.module';
import { PageComponent } from './components/pages/page.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { CreateAccountPageComponent } from './components/pages/account-pages/create-account-page/create-account-page.component';
import { EditAccountPageComponent } from './components/pages/account-pages/edit-account-page/edit-account-page.component';
import { RemoveAccountPageComponent } from './components/pages/account-pages/remove-account-page/remove-account-page.component';
import { CreateProfilePageComponent } from './components/pages/profile-pages/create-profile-page/create-profile-page.component';
import { EditProfilePageComponent } from './components/pages/profile-pages/edit-profile-page/edit-profile-page.component';
import { RemoveProfilePageComponent } from './components/pages/profile-pages/remove-profile-page/remove-profile-page.component';
import { ViewAccountsPageComponent } from './components/pages/account-pages/view-accounts-page/view-accounts-page.component';
import { ViewProfilePageComponent } from './components/pages/profile-pages/view-profile-page/view-profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    MenuComponent,
    HomePageComponent,
    CreateAccountPageComponent,
    EditAccountPageComponent,
    RemoveAccountPageComponent,
    CreateProfilePageComponent,
    EditProfilePageComponent,
    RemoveProfilePageComponent,
    ViewAccountsPageComponent,
    ViewProfilePageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RoutingModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

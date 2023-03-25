import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountPageComponent } from 'src/app/components/pages/account-pages/create-account-page/create-account-page.component';
import { EditAccountPageComponent } from 'src/app/components/pages/account-pages/edit-account-page/edit-account-page.component';
import { RemoveAccountPageComponent } from 'src/app/components/pages/account-pages/remove-account-page/remove-account-page.component';
import { ViewAccountsPageComponent } from 'src/app/components/pages/account-pages/view-accounts-page/view-accounts-page.component';
import { HomePageComponent } from 'src/app/components/pages/home-page/home-page.component';
import { PageComponent } from 'src/app/components/pages/page.component';
import { CreateProfilePageComponent } from 'src/app/components/pages/profile-pages/create-profile-page/create-profile-page.component';
import { EditProfilePageComponent } from 'src/app/components/pages/profile-pages/edit-profile-page/edit-profile-page.component';
import { RemoveProfilePageComponent } from 'src/app/components/pages/profile-pages/remove-profile-page/remove-profile-page.component';
import { ViewProfilePageComponent } from 'src/app/components/pages/profile-pages/view-profile-page/view-profile-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'profile/new',
    component: CreateProfilePageComponent,
  },
  {
    path: 'profile/edit',
    component: EditProfilePageComponent,
  },
  {
    path: 'profile/remove',
    component: RemoveProfilePageComponent,
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ViewProfilePageComponent,
  },
  {
    path: 'account/new',
    component: CreateAccountPageComponent,
  },
  {
    path: 'account/edit',
    component: EditAccountPageComponent,
  },
  {
    path: 'account/remove',
    component: RemoveAccountPageComponent,
  },
  {
    path: 'account',
    pathMatch: 'full',
    component: ViewAccountsPageComponent,
  },
  {
    path: '**',
    component: PageComponent,
    data: { mode: 'fallback' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}

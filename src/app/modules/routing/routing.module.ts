import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'src/app/components/pages/home-page/home-page.component';
import { PageComponent } from 'src/app/components/pages/page.component';
import { SignInPageComponent } from 'src/app/components/pages/profile/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from 'src/app/components/pages/profile/sign-up-page/sign-up-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'user/sign-up',
    component: SignUpPageComponent,
  },
  {
    path: 'user/login',
    component: SignInPageComponent,
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

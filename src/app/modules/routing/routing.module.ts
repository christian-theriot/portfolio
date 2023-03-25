import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from 'src/app/components/pages/page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PageComponent,
  },
  {
    path: '**',
    component: PageComponent,
    data: { wildcard: true },
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

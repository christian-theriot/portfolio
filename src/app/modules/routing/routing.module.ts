import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from 'src/app/components/pages/accounts/accounts.component';
import { DashboardComponent } from 'src/app/components/pages/dashboard/dashboard.component';
import { DividendsComponent } from 'src/app/components/pages/dividends/dividends.component';
import { ExpensesComponent } from 'src/app/components/pages/expenses/expenses.component';
import { HomeComponent } from 'src/app/components/pages/home/home.component';
import { OptionsComponent } from 'src/app/components/pages/options/options.component';
import { PageComponent } from 'src/app/components/pages/page.component';
import { StocksComponent } from 'src/app/components/pages/stocks/stocks.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'accounts',
    component: AccountsComponent,
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
  },
  {
    path: 'stocks',
    component: StocksComponent,
  },
  {
    path: 'options',
    component: OptionsComponent,
  },
  {
    path: 'dividends',
    component: DividendsComponent,
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

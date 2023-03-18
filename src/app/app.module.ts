import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './modules/routing/routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './modules/graphql/graphql.module';
import { PageComponent } from './components/pages/page.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { AccountsComponent } from './components/pages/accounts/accounts.component';
import { ExpensesComponent } from './components/pages/expenses/expenses.component';
import { StocksComponent } from './components/pages/stocks/stocks.component';
import { OptionsComponent } from './components/pages/options/options.component';
import { DividendsComponent } from './components/pages/dividends/dividends.component';
import { HomeComponent } from './components/pages/home/home.component';

@NgModule({
  declarations: [AppComponent, PageComponent, MenuComponent, DashboardComponent, AccountsComponent, ExpensesComponent, StocksComponent, OptionsComponent, DividendsComponent, HomeComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RoutingModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

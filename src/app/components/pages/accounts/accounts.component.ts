import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {
  acct = {
    add: this.formBuilder.group({
      name: this.formBuilder.control<string | null>(null),
      type: this.formBuilder.control<string | null>(null),
    }),
    types: [
      'Brokerage',
      'Checking',
      'Credit',
      '401k',
      'Roth 401k',
      'Roth IRA',
      'Savings',
    ],
  };

  constructor(private formBuilder: FormBuilder) {}

  onNewAccount(e: Event) {
    e.preventDefault();

    console.log(this.acct.add.value);
  }
}

import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function matchOtherValidator(otherName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const other = control.root.get(otherName);

    if (other && control.value !== other.value) {
      return { 'match other': true };
    }

    return null;
  };
}

@Component({
  selector: 'app-create-profile-page',
  templateUrl: './create-profile-page.component.html',
  styleUrls: ['./create-profile-page.component.scss'],
})
export class CreateProfilePageComponent {
  form = this.fb.group({
    email: this.fb.control(null, {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control(null, {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}/
        ),
      ],
    }),
    'validate password': this.fb.control(null, {
      validators: [Validators.required, matchOtherValidator('password')],
    }),
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(e: Event) {
    e.preventDefault();

    console.log(this.form.controls);
  }
}

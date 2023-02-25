import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../shared/password-match-validator.directive';
import { SupabaseService } from '../../services/supabase.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div class="flex justify-center items-center h-screen">
    <form
      class="form-control md:max-w-xs gap-y-3 w-full"
      [formGroup]="signUpForm"
      (ngSubmit)="onSubmit()"
    >
      <input
        placeholder="Email"
        type="text"
        class="input input-primary w-full"
        formControlName="email"
      />
      <div
        *ngIf="email?.invalid && (email?.dirty || email?.touched)"
        class="text-red-500 text-xs"
      >
        <div *ngIf="email?.errors?.['required']">Email is required</div>
        <div *ngIf="email?.errors?.['email']">Wrong email format</div>
      </div>

      <input
        placeholder="Password"
        type="password"
        class=" input input-primary w-full"
        formControlName="password"
      />
      <div
        *ngIf="password?.invalid && (password?.dirty || password?.touched)"
        class="text-red-500 text-xs"
      >
        <div *ngIf="password?.errors?.['required']">Password is required</div>
        <div *ngIf="password?.errors?.['minlength']">
          Password must be greater than 6 character
        </div>
      </div>

      <input
        placeholder="Confirm Password"
        type="password"
        class=" input input-primary w-full"
        formControlName="confirmPassword"
      />
      <div
        *ngIf="
          confirmPassword?.invalid &&
          (confirmPassword?.dirty || confirmPassword?.touched)
        "
        class="text-red-500 text-xs w-full"
      >
        <div *ngIf="confirmPassword?.errors?.['required']">
          Confirm password is required
        </div>
        <div *ngIf="confirmPassword?.errors?.['minlength']">
          Password must be greater than 6 character
        </div>
      </div>
      <div
        *ngIf="signUpForm.invalid && (signUpForm.dirty || signUpForm.touched)"
        class="text-red-500 text-xs"
      >
        <div *ngIf="signUpForm?.errors?.['passwordmatch']">
          Password and confirm password must be the same
        </div>
      </div>

      <input
        type="submit"
        value="login"
        class="btn btn-primary w-full"
        [disabled]="signUpForm.invalid"
      />
    </form>
  </div>`,
  styles: [],
})
export class SignUpComponent {
  signUpForm = this.fb.group(
    {
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(6)],
        },
      ],
      confirmPassword: [
        '',
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
    },
    {
      validators: passwordMatchValidator,
    }
  );

  get email() {
    return this.signUpForm.controls.email;
  }

  get password() {
    return this.signUpForm.controls.password;
  }

  get confirmPassword() {
    return this.signUpForm.controls.confirmPassword;
  }

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async onSubmit() {
    const { email, password } = this.signUpForm.value;
    console.log(this.signUpForm);

    if (email && password) {
      const credential = await this.supabase.signUp({ email, password });
      console.log(credential);
      if (credential.error) {
      } else {
        this.router.navigate(['/']);
      }
    }
  }
}

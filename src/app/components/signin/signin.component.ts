import { SupabaseService } from '../../services/supabase.service';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div class="flex justify-center items-center h-screen">
    <form
      class="form-control md:max-w-2xl gap-y-3"
      [formGroup]="signInForm"
      (ngSubmit)="onSubmit()"
    >
      <input
        placeholder="Email"
        type="text"
        class="input input-primary"
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
        class=" input input-primary"
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
        type="submit"
        value="login"
        class="btn btn-primary"
        [disabled]="signInForm.invalid"
      />
    </form>
  </div>`,
  styles: [],
})
export class SignInComponent {
  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.signInForm.controls.email;
  }

  get password() {
    return this.signInForm.controls.password;
  }

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    const { email, password } = this.signInForm.value;

    if (email && password) {
      const authResponse = await this.supabase.signIn({ email, password });
      if (authResponse.error) {
      } else {
        this.router.navigate(['/']);
      }
    }
  }
}

import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div class="flex justify-center items-center h-screen">
    <form class="form-control md:max-w-2xl gap-y-3" [formGroup]="loginForm">
      <input
        placeholder="Email"
        type="text"
        class="input input-primary"
        formControlName="email"
      />
      <input
        placeholder="Password"
        type="password"
        class=" input input-primary"
        formControlName="password"
      />
      <input
        type="submit"
        value="login"
        class="btn btn-primary"
        [disabled]="!loginForm.valid"
      />
    </form>
  </div>`,
  styles: [],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
}

import { SignUpComponent } from './components/signup/signup.component';
import { SignInComponent } from './components/signin/signin.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', component: AppComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

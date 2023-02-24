import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <a routerLink="/signin">SignIn</a>
    <a routerLink="/signup">SignUp</a>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'travel';
}

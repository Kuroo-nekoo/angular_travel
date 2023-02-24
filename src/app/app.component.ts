import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <a routerLink="/signin">SignIn</a>
    <a routerLink="/signup">SignUp</a>
    <router-outlet></router-outlet>
  `,
  styles: [],
  imports: [RouterLink, RouterOutlet],
})
export class AppComponent {
  title = 'travel';
}

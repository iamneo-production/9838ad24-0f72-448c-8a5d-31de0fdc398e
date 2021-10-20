import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RideSharing';
  isLoggedIn: boolean = false;
  constructor() {
    if (localStorage.getItem('email') != null) {
      this.isLoggedIn = true;
    }
  }
  login(b: any): void {
    if (localStorage.getItem('email') !== null) {
      this.isLoggedIn = true;
    }
  }
  logout(b: boolean): void {
    this.isLoggedIn = b;
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  faHome,
  faSignOutAlt,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  faHome = faHome;
  faProfile = faUser;
  faLogout = faSignOutAlt;
  faUsers = faUsers;
  activeItem: number;
  isAdmin: boolean = false;
  @Output() change = new EventEmitter<boolean>();
  constructor(private router: Router) {
    this.activeItem = 1;
    if (
      localStorage.getItem('email') === 'pc2282001@gmail.com' &&
      localStorage.getItem('password') === 'thor'
    ) {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {}
  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['/']);
    this.change.emit(false);
  }
  async toggle(num: number) {
    this.activeItem = num;
  }
}

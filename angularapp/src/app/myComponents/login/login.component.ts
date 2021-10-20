import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: any = '';
  password: any = '';
  isLoggedIn: boolean = false;
  faLogin = faSignInAlt;
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.password = localStorage.getItem('password');
    if (this.email === null || this.password === null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
      if (
        this.password.trim() === 'thor' &&
        this.email.trim() === 'pc2282001@gmail.com'
      ) {
        this.router.navigate(['/adminRoutes']);
      } else {
        this.router.navigate(['/route']);
      }
    }
  }
  login() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      alert('Please enter valid Details');
    } else if (
      this.email.trim() === 'pc2282001@gmail.com' &&
      this.password.trim() === 'thor'
    ) {
      localStorage.setItem('email', this.email.trim());
      localStorage.setItem('password', this.password.trim());
      this.router.navigate(['/adminRoutes']);
    } else {
      this.http
        .post<boolean>('/login', {
          emailId: this.email.trim(),
          password: this.password.trim(),
        })
        .subscribe((data) => {
          console.log(data);
          if (data == true) {
            localStorage.setItem('email', this.email.trim());
            localStorage.setItem('password', this.password.trim());
            this.router.navigate(['/route']);
          } else {
            alert('Invalid Credentials');
          }
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { faRegistered, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  cpassword: any = '';
  password: any = '';
  username: string = '';
  mobileNumber: string = '';
  email: any = '';
  isLoggedIn: boolean = false;
  faSignUp = faUserPlus;
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
  signUp(): void {
    this.email = this.email.trim();
    this.username = this.username.trim();
    this.password = this.password.trim();
    this.cpassword = this.cpassword.trim();
    this.mobileNumber = this.mobileNumber.trim();
    // console.log('email', this.email);
    // console.log('username', this.username);
    // console.log('password', this.password);
    // console.log('cpass', this.cpassword);
    // console.log('mobile', this.mobileNumber.length);
    // console.log('sas');
    if (
      this.email == '' ||
      this.username == '' ||
      this.password == '' ||
      this.cpassword == '' ||
      this.password !== this.cpassword ||
      this.mobileNumber.length != 10
    ) {
      alert('Please enter correct details');
    } else {
      // console.log('email', this.email);
      // console.log('password', this.password);
      // console.log('cpass', this.cpassword);
      // console.log('mobile', this.mobileNumber);
      this.http
        .post('/signup', {
          emailId: this.email,
          customerName: this.username,
          password: this.password,
          mobileNumber: this.mobileNumber,
        })
        .subscribe((data) => {
          if (data) {
            this.router.navigate(['/login']);
          } else {
            console.log('Error Occured');
          }
        });
    }
  }
}

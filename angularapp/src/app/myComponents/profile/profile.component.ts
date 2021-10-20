import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  cpass: any = '';
  formData: any = {};
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    if (localStorage.getItem('email') === null) {
      this.router.navigate(['/']);
    } else {
      this.fetchDetails();
    }
  }
  fetchDetails(): void {
    this.http
      .get<any>(`/getUserById?emailId=${localStorage.getItem('email')}`)
      .subscribe((data) => {
        this.user = data;
        this.formData = {
          emailId: this.user.emailId,
          Password: '',
          MobileNumber: this.user.mobileNumber,
          CustomerName: this.user.customerName,
        };
      });
  }
  update(): void {
    this.formData.CustomerName = this.formData.CustomerName.trim();
    this.formData.MobileNumber = this.formData.MobileNumber.trim();
    this.formData.Password = this.formData.Password.trim();
    this.cpass = this.cpass.trim();
    if (
      this.formData.CustomerName === '' ||
      this.formData.Password === '' ||
      this.cpass !== this.formData.Password ||
      this.formData.MobileNumber.length != 10
    ) {
      alert('Please enter valid Details');
    } else {
      this.user.customerName = this.formData.CustomerName;
      this.user.mobileNumber = this.formData.MobileNumber;
      this.user.password = this.formData.Password;
      this.http
        .put<any>('/editCustomer', {
          emailId: this.user.emailId,
          password: this.user.password,
          mobileNumber: this.user.mobileNumber,
          customerName: this.user.customerName,
          status: this.user.status,
        })
        .subscribe({
          next: (data) => {
            alert('Successfully Updated');
            this.formData.Password = '';
            this.cpass = '';
            // console.log(data);
          },
          error: (err) => {
            alert('Successfully Updated');
            this.formData.Password = '';
            this.cpass = '';
            // console.log(data);
          },
        });
    }
  }
}

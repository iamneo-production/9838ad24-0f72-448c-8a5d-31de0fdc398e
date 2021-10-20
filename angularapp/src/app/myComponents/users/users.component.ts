import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  faEdit = faUserEdit;
  faDelete = faTrash;
  userData: any = [];
  empData: any = [];
  user: any = {};
  formData: any = {};
  cpass: any = '';
  selected: boolean = false;
  keyword: string = '';
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    if (localStorage.getItem('email') != null) {
      if (
        localStorage.getItem('email') !== 'pc2282001@gmail.com' ||
        localStorage.getItem('password') !== 'thor'
      ) {
        this.router.navigate(['/route']);
      }
      this.fetchData();
    } else {
      this.router.navigate(['/']);
    }
  }
  // select(tick: {}): void {
  //   if (tick === this.curr) {
  //     this.resetData();
  //   } else {
  //     this.selected = true;
  //     this.curr = tick;
  //     this.formData['Source'] = this.curr.startPoint;
  //     this.formData['Destination'] = this.curr.endPoint;
  //     this.formData['Time'] = this.curr.time;
  //     this.formData['Distance'] = this.curr.distance;
  //     this.formData['Seats_Left'] = this.curr.seatsAvailable;
  //   }
  // }
  resetData(): void {
    this.formData = {
      active: '',
      email: '',
      name: '',
      password: '',
      mobileNumber: '',
      status: '',
      vehicleModel: '',
      vehicleNumber: '',
      verified: '',
      id: '',
    };
    this.cpass = '';
    this.selected = false;
  }
  fetchData(): void {
    this.resetData();
    this.http.get<any>('/admin/getEmployee').subscribe((data) => {
      this.empData = data;
      console.log(this.empData);
    });
    this.http.get<any>('/getUsers').subscribe((data) => {
      this.userData = data;
    });
  }
  update(): void {
    for (let i in this.formData) {
      if (typeof this.formData[i] === 'string') {
        this.formData[i] = this.formData[i].trim();
      }
    }
    this.cpass = this.cpass.trim();
    if (
      this.formData.name === '' ||
      this.formData.mobileNumber === '' ||
      this.formData.password === '' ||
      this.cpass !== this.formData.password ||
      this.formData.mobileNumber.toString().length != 10
    ) {
      alert('Please enter valid Details');
    } else {
      if (this.formData.user === 1) {
        this.http
          .put<any>('/editCustomer', {
            emailId: this.formData.email,
            password: this.formData.password,
            mobileNumber: this.formData.mobileNumber,
            customerName: this.formData.name,
            status: this.formData.status,
          })
          .subscribe({
            next: (data) => {
              alert('Successfully Updated');
              this.fetchData();
            },
            error: (err) => {
              alert('Successfully Updated');
              this.fetchData();
            },
          });
      } else {
        this.http
          .put<any>('/admin/editEmployee', {
            username: this.formData.name,
            password: this.formData.password,
            email: this.formData.email,
            mobileNumber: this.formData.mobileNumber,
            vehicleModel: this.formData.vehicleModel,
            vehicleNumber: this.formData.vehicleNumber,
            verified: this.formData.verified,
            active: this.formData.active,
          })
          .subscribe({
            next: (data) => {
              alert('Successfully Updated');
              this.fetchData();
            },
            error: (err) => {
              alert('Successfully Updated');
              this.fetchData();
            },
          });
      }
    }
  }
  edit(n: number, d: any): void {
    this.resetData();
    if (n === 1) {
      this.formData.email = d.emailId;
      this.formData.name = d.customerName;
      this.formData.status = d.status;
      this.formData.id = d.id;
    } else {
      this.formData.status = d.status;
      this.formData.active = d.active;
      this.formData.id = d.id;
      this.formData.verified = d.verified;
      this.formData.vehicleNumber = d.vehicleNumber;
      this.formData.vehicleModel = d.vehicleModel;
      this.formData.email = d.email;
      this.formData.name = d.username;
    }
    this.formData.mobileNumber = d.mobileNumber;
    this.formData.user = n;
    this.selected = true;
  }
  delete(n: number, d: any): void {
    console.log(d.emailId);
    let url = '';
    if (n === 1) {
      url = `/deleteUserByEmail?emailId=${d.emailId}`;
      console.log(url);
    } else {
      url = `/admin/delete?emailId=${d.email}`;
    }
    this.http.delete<any>(url).subscribe({
      next: (data) => {
        alert('Successfully deleted');
        this.fetchData();
      },
      error: (err) => {
        alert('Successfully deleted');
        this.fetchData();
      },
    });
  }
}

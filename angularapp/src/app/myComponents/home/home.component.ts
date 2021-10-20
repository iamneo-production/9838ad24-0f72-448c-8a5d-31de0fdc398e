import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPowerOff, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = {};
  faSearch = faSearch;
  faPO = faPowerOff;
  data: any = [];
  formData: any = {};
  curr: any = {};
  selected: boolean = false;
  keyword: string = '';
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    if (localStorage.getItem('email') != null) {
      if (
        localStorage.getItem('email') === 'pc2282001@gmail.com' &&
        localStorage.getItem('password') === 'thor'
      ) {
        this.router.navigate(['/adminRoutes']);
      }
      this.fetchData();
    } else {
      this.router.navigate(['/']);
    }
  }
  // search(): void {
  //   this.keyword = this.keyword.trim();
  //   console.log(this.keyword);
  // }
  select(tick: {}): void {
    if (tick === this.curr) {
      this.resetData();
    } else {
      this.selected = true;
      this.curr = tick;
      this.formData['Source'] = this.curr.startPoint;
      this.formData['Destination'] = this.curr.endPoint;
      this.formData['Time'] = this.curr.time;
      this.formData['Distance'] = this.curr.distance;
      this.formData['Seats_Left'] = this.curr.seatsAvailable;
    }
  }
  resetData(): void {
    this.selected = false;
    this.curr = {};
    this.formData = {
      Source: '-',
      Destination: '-',
      Time: '-',
      Distance: '-',
      Seats_Left: '-',
    };
  }
  fetchData(): void {
    this.resetData();
    this.http.get<any>('/routes').subscribe((data) => {
      this.data = data;
    });
    this.http
      .get<any>(`/getUserById?emailId=${localStorage.getItem('email')}`)
      .subscribe((data) => {
        this.user = data;
      });
  }
  endTrip(par: number = 1): boolean {
    if (this.user.status) {
      if (par === 1) {
        this.user.status = !this.user.status;
        this.http
          .put<string>('/editCustomer', {
            emailId: this.user.emailId,
            password: this.user.password,
            mobileNumber: this.user.mobileNumber,
            customerName: this.user.customerName,
            status: this.user.status,
          })
          .subscribe({
            next: (data) => {
              console.log('ride ended');
              alert('Ride Ended');
            },
            error: (err) => {
              alert('Ride Ended');
              this.curr.seatsAvailable += 1;
              this.formData['Seats_Left'] = this.curr.seatsAvailable;
              this.http
                .put<any>('/admin/editRoutes', {
                  startPoint: this.curr.startPoint,
                  endPoint: this.curr.endPoint,
                  distance: this.curr.distance,
                  time: this.curr.time,
                  date: this.curr.date,
                  carModel: this.curr.carModel,
                  registrationNo: this.curr.registrationNo,
                  seatsAvailable: this.curr.seatsAvailable,
                })
                .subscribe({
                  next: (res) => {
                    this.resetData();
                  },
                  error: (err) => {
                    this.resetData();
                  },
                });
            },
          });
      }
      return false;
    } else {
      if (par === 1) alert('No Trip Was Booked');
      else {
        this.user.status = !this.user.status;
        this.http
          .put<string>('/editCustomer', {
            emailId: this.user.emailId,
            password: this.user.password,
            mobileNumber: this.user.mobileNumber,
            customerName: this.user.customerName,
            status: this.user.status,
          })
          .subscribe({
            next: (data) => {},
            error: (err) => {
              console.log('error' + err);
            },
          });
      }
      return true;
    }
  }
  book(): void {
    if (this.curr.seatsAvailable > 0 && this.endTrip(2)) {
      this.http
        .post<any>('/saveBooking', {
          emailId: this.user.emailId,
          registrationNo: this.curr.registrationNo,
        })
        .subscribe((data: any) => {
          if (data) {
            console.log(data);
            this.curr.seatsAvailable -= 1;
            this.formData['Seats_Left'] = this.curr.seatsAvailable;
            this.http
              .put<any>('/admin/editRoutes', {
                startPoint: this.curr.startPoint,
                endPoint: this.curr.endPoint,
                distance: this.curr.distance,
                time: this.curr.time,
                date: this.curr.date,
                carModel: this.curr.carModel,
                registrationNo: this.curr.registrationNo,
                seatsAvailable: this.curr.seatsAvailable,
              })
              .subscribe({
                next: (res) => {
                  alert('Booked Successfully');
                  console.log(res);
                  this.resetData();
                },
                error: (err) => {
                  alert('Booked Successfully');
                  console.log(err);
                  this.resetData();
                },
              });
          } else {
            alert('error occurred!!');
            console.log('error, need to delete data from bookings db');
          }
        });
    } else {
      if (this.user.status) alert('Already booked a ride');
      else alert('Seats Unavailable!');
    }
  }
}

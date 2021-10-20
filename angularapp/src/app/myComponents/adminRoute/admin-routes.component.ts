import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-routes',
  templateUrl: './admin-routes.component.html',
  styleUrls: ['./admin-routes.component.css'],
})
export class AdminRoutesComponent implements OnInit {
  distance: number = 0;
  startPoint: string = '';
  endPoint: string = '';
  data: any = [];
  curr: any = {};
  formData: any = {};
  selected: boolean = false;
  keyword: string = '';
  faTrash = faTrashAlt;
  faSearch = faSearch;
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
  resetData(): void {
    this.selected = false;
    this.curr = {};
    this.formData = {
      startPoint: '',
      endPoint: '',
      time: '',
      carModel: '',
      registrationNo: '',
      seatsAvailable: '',
      distance: '',
      date: '',
    };
  }
  select(tick: {}): void {
    if (tick === this.curr) {
      this.resetData();
    } else {
      this.selected = true;
      this.curr = tick;
      for (let i in tick) {
        this.formData[i] = this.curr[i];
      }
    }
  }
  updateData(): void {
    this.http
      .put<any>('/admin/editRoutes', {
        startPoint: this.formData.startPoint,
        endPoint: this.formData.endPoint,
        time: this.formData.time,
        carModel: this.formData.carModel,
        registrationNo: this.formData.registrationNo,
        seatsAvailable: this.formData.seatsAvailable,
        distance: this.formData.distance,
        date: this.formData.date,
      })
      .subscribe({
        next: (data) => {
          for (let i in this.formData) {
            this.curr[i] = this.formData[i];
          }
          this.resetData();
          alert('Update Successful');
        },
        error: (err) => {
          for (let i in this.formData) {
            this.curr[i] = this.formData[i];
          }
          this.resetData();
          alert('Update Successful');
          // console.log(err);
        },
      });
  }
  addData(): void {
    this.http
      .post<any>('/admin/addRoutes', {
        startPoint: this.formData.startPoint,
        endPoint: this.formData.endPoint,
        time: this.formData.time,
        carModel: this.formData.carModel,
        registrationNo: this.formData.registrationNo,
        seatsAvailable: this.formData.seatsAvailable,
        distance: this.formData.distance,
        date: this.formData.date,
      })
      .subscribe({
        next: (data) => {
          this.fetchData();
          alert('Added Successful');
        },
        error: (err) => {
          this.fetchData();
          alert('Added Successfully');
        },
      });
  }
  deleteData(rn: string): void {
    this.http
      .delete<any>(`/admin/deleteRoutes?registrationNo=${rn}`)
      .subscribe({
        next: (data) => {
          this.fetchData();
          alert('Deleted Successfully');
        },
        error: (err) => {
          this.fetchData();
          alert('Deleted Successfully');
        },
      });
  }
  check(): boolean {
    return true;
  }
  fetchData(): void {
    this.resetData();
    this.http.get<any>('routes').subscribe((data) => {
      this.data = data;
      // console.log(data);
    });
  }
}

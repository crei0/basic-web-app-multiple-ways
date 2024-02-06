import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_PATH } from '../utilities/constants';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  data = {
    totalTransactionsCount: 0
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(API_PATH.DASHBOARD).subscribe(data => {
      this.data = data;
    });
  }
}

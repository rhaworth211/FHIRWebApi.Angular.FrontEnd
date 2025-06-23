import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.scss'
})
export class SecureComponent implements OnInit {
  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://localhost:7091/api/secure/secure-data')
      .subscribe(res => this.data = res);
  }
}
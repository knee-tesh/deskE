import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  
  list;
  displayedColumns = ['Name','Country','Phone','Address','email'];

  constructor(private route:Router) { }

  ngOnInit() {
    // get list from sessionstorage
    this.list = JSON.parse(sessionStorage.getItem('list'))
  }

  // navigate back to first page
  back(){
    this.route.navigate(['']);
  }

}

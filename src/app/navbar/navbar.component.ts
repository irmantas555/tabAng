import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authenticated:boolean = false;

  constructor(private app: AppServiceService) { }

  ngOnInit(): void {
  }

  logout(){
    this.app.logout();
  }




}

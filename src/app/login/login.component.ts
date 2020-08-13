import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AppServiceService } from '../app-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {email: '', password: ''};
  
  constructor(private app: AppServiceService, private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form:NgForm){
    this.app.authenticate(this.credentials);
    this.router.navigate(['./home']);
  }

}
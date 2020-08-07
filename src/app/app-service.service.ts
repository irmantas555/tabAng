import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { stringify } from 'querystring';
import { Subject, BehaviorSubject } from 'rxjs';
import { logging } from 'protractor';
import { Router } from '@angular/router';
import { Employee } from './employee';
import { count } from 'console';


interface loging {
  email: string;
  password: string;
}

interface resp{
    token:string,
    email:string,
    roles:string[],
    firstName:string,
    error:string
};

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  credentials: { email: string; password: string };
  authenticated = false;
  auth = new Subject<boolean>();
  authUser = new BehaviorSubject<resp>(null);
  customHeaders:HttpHeaders = new HttpHeaders();


  constructor(private http: HttpClient, private router:Router) {};

  option={
    headers:new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded'),
    withCredentials: true
  }

  authenticate(credentials: loging) {

    const params = new HttpParams().append('email',credentials.email).append('password',credentials.password)
    
    this.http
      .post('http://localhost:8080/login',params.toString(),this.option)
      .subscribe((response:resp) => {
        this.authUser.next(response);
        this.authenticated = true;
        this.auth.next(this.authenticated)

      });
  }

  logout() {
    this.http
      .get('http://localhost:8080/logout')
      .subscribe((response:resp) => {
        this.authUser.next(null);
        this.authenticated = false;
        this.auth.next(this.authenticated)

      });
  }

  signout() {
    this.http
      .get('http://localhost:8080/logout')
      .subscribe((response:resp) => {
        this.authenticated = false;
        this.auth.next(this.authenticated)
        this.authUser.next(null)
        alert('You`ve just logged out')
        this.router.navigate(['./home'])
      });
  }

  postEmployee(empl:Employee[]){
    let count:number= 0;
    empl.forEach(element => {
      console.log('got one')
      this.http
      .post('http://localhost:8080/dto/empl',empl.toString(),this.option)
      .subscribe((response:resp) => {
          count++;
  
      },(err)=>{
        console.log('emloyee: '  + element + ' could not be saved' + err)
      }
      )
    });
    console.log('so much elements posted' + count)  
    
  };

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import {AuthInterceptor} from './auth-interceptor.service'
import { HomeComponent } from './home/home.component';
import { EmployeedataComponent } from './employeedata/employeedata.component';
import { DepartmentdataComponent } from './departmentdata/departmentdata.component';
import { ShiftsdataComponent } from './shiftsdata/shiftsdata.component';
import { AvoidancedataComponent } from './avoidancedata/avoidancedata.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RowppComponent } from './rowpp/rowpp.component';
import { CcellComponent } from './ccell/ccell.component';
import { ScheduleComponent } from './schedule/schedule.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    EmployeedataComponent,
    DepartmentdataComponent,
    ShiftsdataComponent,
    AvoidancedataComponent,
    RowppComponent,
    CcellComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NoopAnimationsModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

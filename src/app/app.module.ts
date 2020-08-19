import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { CausesdataComponent } from './causesdata/causesdata.component';
import { CountrydataComponent } from './countrydata/countrydata.component';
import { HolidaydataComponent } from './holidaydata/holidaydata.component';
import { AppDataService } from './app-data.service';
import { ScheduleService } from './schedule.service';
import { EmplCellComponent } from './empl-cell/empl-cell.component';
import { DcellComponent } from './dcell/dcell.component';
import { DrowComponent } from './drow/drow.component';
import { ScheduleHhtpService } from './schedule-http.service';
import { RowDirectiveDirective } from './row-directive.directive';

export function appInit(appDataService: AppDataService,scheduleService:ScheduleService, scheduleHttpService:ScheduleHhtpService) {
  return () =>{
    appDataService.init();
    scheduleService.init();
    scheduleHttpService.init();
  } 
}

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
    ScheduleComponent,
    CausesdataComponent,
    CountrydataComponent,
    HolidaydataComponent,
    EmplCellComponent,
    DcellComponent,
    DrowComponent,
    RowDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NoopAnimationsModule
  ],
  providers: [AppDataService, ScheduleService,ScheduleHhtpService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppDataService,ScheduleService, ScheduleHhtpService]
    }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, DatePipe],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

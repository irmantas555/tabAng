import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeedataComponent } from './employeedata/employeedata.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CausesdataComponent } from './causesdata/causesdata.component';
import { Country } from './country';
import { CountrydataComponent } from './countrydata/countrydata.component';
import { HolidaydataComponent } from './holidaydata/holidaydata.component';
import { DepartmentdataComponent } from './departmentdata/departmentdata.component';
import { ShiftsdataComponent } from './shiftsdata/shiftsdata.component';


const routes: Routes = [
  {path: 'signin', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'schedule', component:ScheduleComponent},
  {path: 'employeedata', component:EmployeedataComponent},
  {path: 'causesedata', component:CausesdataComponent},
  {path: 'countryedata', component:CountrydataComponent},
  {path: 'departmentdata', component:DepartmentdataComponent},
  {path: 'holidaydata', component:HolidaydataComponent},
  {path: 'shiftdata', component:ShiftsdataComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeedataComponent } from './employeedata/employeedata.component';


const routes: Routes = [
  {path: 'signin', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'employeedata', component:EmployeedataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

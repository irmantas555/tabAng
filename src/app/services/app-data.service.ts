import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Cause } from '../cause';
import { Country } from '../country';
import { DepartmentDto } from '../department-dto';
import { Department } from '../department';
import { HolidayDto } from '../holiday-dto';
import { Holiday } from '../holiday';
import { ShiftDto } from '../shift-dto';
import { Shift } from '../shift';
import { EmplJobData } from '../empl-job-data';
import { Payment } from '../payment';
import { ExHours } from '../ex-hours';
import { Position } from '../position';
import { Employee } from '../employee';
import { Empl } from '../empl';
import {EmplPersData} from '../empl-pers-data';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  // serverString:string = '192.168.1.105:8080'
  // serverString:string = '78.63.114.206:50000'
  serverString = 'localhost:8080';

  // cause properties
  causesStringdata = new Subject<Cause>();
  causesdata = new Subject<Cause>();
  causeob: Cause = new Cause();
  allCauses: Cause[] = [];
  // country properties
  countrydata = new Subject<Country>();
  countryob: Country = new Country();
  allCountries: Country[] = [];
  // employees properties
  employeedata = new Subject<Empl>();
  emploeeob: Empl = new Empl();
  allEmployees: Empl[] = [];
  // employPersData properties
  emploeePDob: EmplPersData = new EmplPersData();
  allEmplsPersData: EmplPersData[] = [];
  // employPersData properties
  emploeeJDob: EmplJobData = new EmplJobData();
  allEmplsJobData: EmplJobData[] = [];
  // payment properties
  paymentdata = new Subject<Payment>();
  paymentob: Payment = new Payment();
  allPayments: Payment[] = [];
  // exhours properties
  exhourstdata = new Subject<ExHours>();
  exhourob: ExHours = new ExHours();
  allExHours: ExHours[] = [];
  // position properties
  positiondata = new Subject<Position>();
  positionob: Position = new Position();
  allPositions: Position[] = [];
  // Department properties
  departmentdtodata = new Subject<string>();
  departmentdata = new Subject<Department>();
  departmentob: DepartmentDto = new DepartmentDto();
  allDepartments: Department[] = [];
  // DepartmentData properties
  empljobtdata = new Subject<EmplJobData>();
  allEmplJobData: EmplJobData[] = [];
  // Holiday properties
  holidaydtotdata = new Subject<string>();
  holidaytdata = new Subject<Holiday>();
  holidayob: HolidayDto = new HolidayDto();
  allHolidays: Holiday[] = [];
  // Shift properties
  shiftdtodata = new Subject<string>();
  shiftdata = new Subject<Shift>();
  shiftob: ShiftDto = new ShiftDto();
  allShifts: Shift[] = [];
  times: string[] = [];

  optionjson = {
    headers: new HttpHeaders().append('Content-Type', 'application/json'),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}


  init(){
    this.getEmployeess();
    this.getCauses();
    this.getCountries();
    this.getDepartments();
    this.getEmployJobData();
    this.getPositions();
    this.getShifts();
    this.getHolidays();
    this.getEmployeess();
    this.makeTimes();
  }

  getCauses() {
    this.http
      .get('http://' + this.serverString + '/data/cause')
      .subscribe((response: Cause[]) => {
        response.forEach((element: Cause) => {
          this.allCauses.push(element);
          this.causesdata.next(element);
        });
      });
  }

  postCause(receivedCause: Cause) {
    console.log('received' + receivedCause);
    this.causeob = receivedCause;
    console.log(this.causeob);
    this.http
      .post(
        'http://' + this.serverString + '/data/cause',
        JSON.stringify(this.causeob),
        this.optionjson
      )
      .subscribe((response: Cause) => {
        this.causesdata.next(response);
      },
      (err) => {
        console.log('there was an error posting: ' + err);
      });
  }

  getCountries() {
    this.http
      .get('http://' + this.serverString + '/data/country')
      .subscribe((response: Country[]) => {
        response.forEach((element) => {
          this.countrydata.next(element);
          this.allCountries.push(element);
        });
      });
  }

  postCountry(receivedCountry: Country) {
    this.countryob = receivedCountry;
    this.http
      .post(
        'http://' + this.serverString + '/data/country',
        JSON.stringify(this.countryob),
        this.optionjson
      )
      .subscribe((response: Country) => {
        this.countrydata.next(response);
      },
      (err: any) => {
        console.log('There was an error posting: ' + err);
      });
  }


  getEmployeess() {
    this.http
      .get('http://' + this.serverString + '/data/employee')
      .subscribe((response: Empl[]) => {
        response.forEach((element) => {
          this.employeedata.next(element);
          this.allEmployees.push(element);
        });
      });
  }

  postEmployee(receivedEmpl: Empl) {
    this.emploeeob = receivedEmpl;
    this.http
      .post(
        'http://' + this.serverString + '/data/employee',
        JSON.stringify(this.emploeeob),
        this.optionjson
      )
      .subscribe((response: Empl) => {
        this.employeedata.next(response);
       },
      (err: any) => {
        console.log('There was an error posting: ' + err);
      });
  }

  getEmployPersData() {
    this.http
      .get('http://' + this.serverString + '/data/employeepd')
      .subscribe((response: EmplPersData[]) => {
        response.forEach((element) => {
         this.allEmplsPersData.push(element);
        });
      });
  }

  postEmployeePD(receivedEmpl: EmplPersData) {
    this.emploeePDob = receivedEmpl;
    this.http
      .post(
        'http://' + this.serverString + '/data/employeepd',
        JSON.stringify(this.emploeeob),
        this.optionjson
      )
      .subscribe((response: EmplPersData) => {
        this.allEmplsPersData.push(response);
      },
      (err: any) => {
        console.log('There was an error posting: ' + err);
      });
  }

  getEmployJobData() {
    this.http
      .get('http://' + this.serverString + '/data/employeejd')
      .subscribe((response: EmplJobData[]) => {
        response.forEach((element) => {
         this.allEmplJobData.push(element);
        });
      });
  }

  postEmployeeJD(receivedEmpl: EmplJobData) {
    this.emploeeJDob = receivedEmpl;
    this.http
      .post(
        'http://' + this.serverString + '/data/employeejd',
        JSON.stringify(this.emploeeJDob),
        this.optionjson
      )
      .subscribe((response: EmplJobData) => {
        this.allEmplJobData.push(response);
      },
      (err: any) => {
        console.log('There was an error posting: ' + err);
      });
  }


  getDepartments() {
    this.http
      .get('http://' + this.serverString + '/data/department')
      .subscribe((response: Department[]) => {
        response.forEach((element) => {
          this.departmentdata.next(element);
          this.allDepartments.push(element);
        });
      });
  }

  postDepartment(receivedDept: Department) {
    // console.log(JSON.stringify(receivedDept));
    this.http
      .post(
        'http://' + this.serverString + '/data/department',
        JSON.stringify(receivedDept),
        this.optionjson
      )
      .subscribe((response: Department) => {
        this.departmentdata.next(response);
        this.departmentdtodata.next(receivedDept.name);
      },
      (err: any) => {
        console.log('There was an error posting: ' + err);
      });
  }
  getDtoHolidays() {
    this.http
      .get('http://' + this.serverString + '/dto/holiday')
      .subscribe((response: HolidayDto[]) => {
        response.forEach((element) => {
          this.holidaydtotdata.next(
            element.date +
              ' ' +
              element.name +
              ' ' +
              element.everyear +
              ' ' +
              element.country
          );
        });
      });
  }

  getHolidays() {
    this.http
      .get('http://' + this.serverString + '/data/holiday')
      .subscribe((response: Holiday[]) => {
        response.forEach((element) => {
          this.holidaytdata.next(element);
          this.allHolidays.push(element);
        });
      });
  }

  postHoliday(receivedHoliday: Holiday) {
    this.http
      .post(
        'http://' + this.serverString + '/data/holiday',
        JSON.stringify(receivedHoliday),
        this.optionjson
      )
      .subscribe((response: Holiday) => {
        this.holidaydtotdata.next(response.date + ' ' + response.name);
        this.holidaytdata.next(response);
      },
      ( err: any) => {
        console.log('There was an error posting: ' + err);
      });
  }
  getDtoShifts() {
    this.http
      .get('http://' + this.serverString + '/dto/shift')
      .subscribe((response: ShiftDto[]) => {
        response.forEach((element) => {
          this.shiftdtodata.next(
            '' +
              element.shiftNumber +
              ' ' +
              element.department +
              ' ' +
              element.startTime +
              ' ' +
              element.endTime +
              ' ' +
              element.timeOutMinutes +
              ' ' +
              element.validFrom
          );
        });
      });
  }

  getShifts() {
    this.http
      .get('http://' + this.serverString + '/data/shift')
      .subscribe((response: Shift[]) => {
        response.forEach((element) => {
          this.shiftdata.next(element);
          this.allShifts.push(element);
        });
      });
  }

  postShift(receivedShift: Shift) {
    // console.log(JSON.stringify(receivedShift));
    this.http
      .post(
        'http://' + this.serverString + '/data/shift',
        JSON.stringify(receivedShift),
        this.optionjson
      )
      .subscribe((response: Shift) => {
        this.shiftdata.next(response);
      },
      (err: any) => {
        console.log('There was an error posting: ' + err);
      });
  }

  getPayments() {
    this.http
      .get('http://' + this.serverString + '/data/payments')
      .subscribe((response: Payment[]) => {
        response.forEach((element) => {
          this.paymentdata.next(element);
        });
      });
  }

  postPayment(receivedP: Payment) {
    console.log('received' + receivedP);
    this.paymentob = receivedP;
    this.http
      .post(
        'http://' + this.serverString + '/data/payments',
        JSON.stringify(this.paymentob),
        this.optionjson
      )
      .subscribe((response: Payment) => {
        this.paymentdata.next(response);
      },
      (err) => {
        console.log('there was an error posting: ' + err);
      });
  }

  getExhours() {
    this.http
      .get('http://' + this.serverString + '/data/exhours')
      .subscribe((response: ExHours[]) => {
        response.forEach((element) => {
          this.exhourstdata.next(element);
        });
      });
  }

  postExHour(receivedH: ExHours) {
    console.log('received' + receivedH);
    this.exhourob = receivedH;
    this.http
      .post(
        'http://' + this.serverString + '/data/exhours',
        JSON.stringify(this.exhourob),
        this.optionjson
      )
      .subscribe((response: ExHours) => {
        this.exhourstdata.next(response);
      },
      (err) => {
        console.log('there was an error posting: ' + err);
      });
  }
  getPositions() {
    this.http
      .get('http://' + this.serverString + '/data/position')
      .subscribe((response: Position[]) => {
        response.forEach((element) => {
          this.positiondata.next(element);
          this.allPositions.push(element);
        });
      });
  }

  postPosition(receivedP: Position) {
    console.log('received' + receivedP);
    this.positionob = receivedP;
    this.http
      .post(
        'http://' + this.serverString + '/data/position',
        JSON.stringify(this.positionob),
        this.optionjson
      )
      .subscribe((response: Position) => {
        this.positiondata.next(response);
      },
      (err) => {
        console.log('there was an error posting: ' + err);
      });
  }


  makeTimes() {
    for (let indexH = 0; indexH < 24; indexH++) {
      for (let indexM = 0; indexM < 50; indexM += 15) {
        if (indexM === 0){
          this.times.push('' + indexH + ':00:00');
        } else{
          this.times.push('' + indexH + ':' + indexM + ':00');
        }
      }
    }
  }
}

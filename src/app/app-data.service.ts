import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { CausesdataComponent } from './causesdata/causesdata.component';
import { Cause } from './cause';
import { Country } from './country';
import { DepartmentDto } from './department-dto';
import { Department } from './department';
import { HolidayDto } from './holiday-dto';
import { Holiday } from './holiday';
import { ShiftDto } from './shift-dto';
import { Shift } from './shift';
import { EmplJobData } from './empl-job-data';
import { Payment } from './payment';
import { ExHours } from './ex-hours';
import { Position } from './position';

@Injectable({
  providedIn: 'root',
})
export class AppDataService implements OnInit {
  // cause properties
  causesStringdata = new Subject<Cause>();
  causesdata = new Subject<Cause>();
  causeob: Cause = new Cause();
  allCauses: Cause[];
  // country properties
  countrydata = new Subject<Country>();
  countryob: Country = new Country();
  allCounties: Country[];
  // payment properties
  paymentdata = new Subject<Payment>();
  paymentob: Payment = new Payment();
  allPayments: Payment[];
  // exhours properties
  exhourstdata = new Subject<ExHours>();
  exhourob: ExHours = new ExHours();
  allExHours: ExHours[];
  // position properties
  positiondata = new Subject<Position>();
  positionob: Position = new Position();
  allPositions: Position[];
  //Department properties
  departmentdtodata = new Subject<string>();
  departmentdata = new Subject<Department>();
  departmentob: DepartmentDto = new DepartmentDto();
  allDepartments: Department[];
  //DepartmentData properties
  datadepartmentdata = new Subject<EmplJobData>();
  allDataDepartments: EmplJobData[];
  //Holiday properties
  holidaydtotdata = new Subject<string>();
  holidaytdata = new Subject<Holiday>();
  holidayob: HolidayDto = new HolidayDto();
  allHolidays: Holiday[];
  //Shift properties
  shiftdtodata = new Subject<string>();
  shiftdata = new Subject<Shift>();
  shiftob: ShiftDto = new ShiftDto();
  allShifts: Shift[];

  optionjson = {
    headers: new HttpHeaders().append('Content-Type', 'application/json'),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getCauses() {
    this.http
      .get('http://localhost:8080/data/cause')
      .subscribe((response: Cause[]) => {
        response.forEach((element) => {
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
        'http://localhost:8080/data/cause',
        JSON.stringify(this.causeob),
        this.optionjson
      )
      .subscribe((response: Cause) => {
        this.causesdata.next(response);
      }),
      (err) => {
        console.log('there was an error posting: ' + err);
      };
  }

  getCountries() {
    this.http
      .get('http://localhost:8080/data/country')
      .subscribe((response: Country[]) => {
        response.forEach((element) => {
          this.countrydata.next(element);
        });
      });
  }

  postCountry(receivedCountry: Country) {
    this.countryob = receivedCountry;
    this.http
      .post(
        'http://localhost:8080/data/country',
        JSON.stringify(this.countryob),
        this.optionjson
      )
      .subscribe((response: Country) => {
        this.countrydata.next(response);
      }),
      (err: any) => {
        console.log('There was an error posting: ' + err);
      };
  }

  getDtoDepartments() {
    this.http
      .get('http://localhost:8080/dto/department')
      .subscribe((response: DepartmentDto[]) => {
        response.forEach((element) => {
          this.departmentdtodata.next(element.name + ' ' + element.country);
        });
      });
  }

  getDataDepartments() {
    this.http
      .get('http://localhost:8080/data/department')
      .subscribe((response: EmplJobData[]) => {
        response.forEach((element) => {
          this.datadepartmentdata.next(element);
        });
      });
  }

  getDepartments() {
    this.http
      .get('http://localhost:8080/data/department')
      .subscribe((response: Department[]) => {
        response.forEach((element) => {
          this.departmentdata.next(element);
        });
      });
  }

  postDepartment(receivedDept: DepartmentDto) {
    this.departmentob = receivedDept;
    this.http
      .post(
        'http://localhost:8080/data/department',
        JSON.stringify(this.departmentob),
        this.optionjson
      )
      .subscribe((response: Department) => {
        this.departmentdata.next(response);
        this.departmentdtodata.next(receivedDept.name);
      }),
      (err: any) => {
        console.log('There was an error posting: ' + err);
      };
  }
  getDtoHolidays() {
    this.http
      .get('http://localhost:8080/dto/holiday')
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
      .get('http://localhost:8080/data/holiday')
      .subscribe((response: Holiday[]) => {
        response.forEach((element) => {
          this.holidaytdata.next(element);
        });
      });
  }

  postHoliday(receivedHoliday: HolidayDto) {
    this.holidayob = receivedHoliday;
    this.http
      .post(
        'http://localhost:8080/data/holiday',
        JSON.stringify(this.departmentob),
        this.optionjson
      )
      .subscribe((response: Holiday) => {
        this.holidaydtotdata.next(response.date + ' ' + response.name);
        this.holidaytdata.next(response);
      }),
      (err: any) => {
        console.log('There was an error posting: ' + err);
      };
  }
  getDtoShifts() {
    this.http
      .get('http://localhost:8080/dto/shift')
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
      .get('http://localhost:8080/data/shift')
      .subscribe((response: Shift[]) => {
        response.forEach((element) => {
          this.shiftdata.next(element);
        });
      });
  }

  postShift(receivedShift: ShiftDto) {
    this.shiftob = receivedShift;
    this.http
      .post(
        'http://localhost:8080/data/shift',
        JSON.stringify(this.shiftob),
        this.optionjson
      )
      .subscribe((response: Shift) => {
        this.shiftdata.next(response);
      }),
      (err: any) => {
        console.log('There was an error posting: ' + err);
      };
  }

  getPayments() {
    this.http
      .get('http://localhost:8080/data/payment')
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
        'http://localhost:8080/data/cause',
        JSON.stringify(this.paymentob),
        this.optionjson
      )
      .subscribe((response: Payment) => {
        this.paymentdata.next(response);
      }),
      (err) => {
        console.log('there was an error posting: ' + err);
      };
  }

  getExhours() {
    this.http
      .get('http://localhost:8080/data/exhours')
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
        'http://localhost:8080/data/exhours',
        JSON.stringify(this.exhourob),
        this.optionjson
      )
      .subscribe((response: ExHours) => {
        this.exhourstdata.next(response);
      }),
      (err) => {
        console.log('there was an error posting: ' + err);
      };
  }
  getPositions() {
    this.http
      .get('http://localhost:8080/data/exhours')
      .subscribe((response: Position[]) => {
        response.forEach((element) => {
          this.positiondata.next(element);
        });
      });
  }

  postPosition(receivedP: Position) {
    console.log('received' + receivedP);
    this.positionob = receivedP;
    this.http
      .post(
        'http://localhost:8080/data/exhours',
        JSON.stringify(this.positionob),
        this.optionjson
      )
      .subscribe((response: Position) => {
        this.positiondata.next(response);
      }),
      (err) => {
        console.log('there was an error posting: ' + err);
      };
  }
}

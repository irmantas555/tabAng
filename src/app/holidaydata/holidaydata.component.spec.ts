import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaydataComponent } from './holidaydata.component';

describe('HolidaydataComponent', () => {
  let component: HolidaydataComponent;
  let fixture: ComponentFixture<HolidaydataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaydataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

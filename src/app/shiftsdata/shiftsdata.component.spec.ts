import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsdataComponent } from './shiftsdata.component';

describe('ShiftsdataComponent', () => {
  let component: ShiftsdataComponent;
  let fixture: ComponentFixture<ShiftsdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftsdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentdataComponent } from './departmentdata.component';

describe('DepartmentdataComponent', () => {
  let component: DepartmentdataComponent;
  let fixture: ComponentFixture<DepartmentdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

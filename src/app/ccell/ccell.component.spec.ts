import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcellComponent } from './ccell.component';

describe('CcellComponent', () => {
  let component: CcellComponent;
  let fixture: ComponentFixture<CcellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

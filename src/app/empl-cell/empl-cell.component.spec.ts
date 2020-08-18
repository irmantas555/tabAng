import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplCellComponent } from './empl-cell.component';

describe('EmplCellComponent', () => {
  let component: EmplCellComponent;
  let fixture: ComponentFixture<EmplCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

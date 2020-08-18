import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrowComponent } from './drow.component';

describe('DrowComponent', () => {
  let component: DrowComponent;
  let fixture: ComponentFixture<DrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

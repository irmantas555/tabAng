import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowppComponent } from './rowpp.component';

describe('RowppComponent', () => {
  let component: RowppComponent;
  let fixture: ComponentFixture<RowppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

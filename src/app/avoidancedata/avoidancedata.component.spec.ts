import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoidancedataComponent } from './avoidancedata.component';

describe('AvoidancedataComponent', () => {
  let component: AvoidancedataComponent;
  let fixture: ComponentFixture<AvoidancedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvoidancedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvoidancedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

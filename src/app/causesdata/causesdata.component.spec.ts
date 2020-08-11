import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CausesdataComponent } from './causesdata.component';

describe('CausesdataComponent', () => {
  let component: CausesdataComponent;
  let fixture: ComponentFixture<CausesdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CausesdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CausesdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

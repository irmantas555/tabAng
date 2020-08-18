import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterCardComponent } from './alter-card.component';

describe('AlterCardComponent', () => {
  let component: AlterCardComponent;
  let fixture: ComponentFixture<AlterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

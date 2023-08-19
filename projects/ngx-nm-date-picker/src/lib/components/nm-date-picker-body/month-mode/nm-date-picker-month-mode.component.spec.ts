import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmDatePickerMonthModeComponent } from './nm-date-picker-month-mode.component';

describe('NmDatePickerMonthModeComponent', () => {
  let component: NmDatePickerMonthModeComponent;
  let fixture: ComponentFixture<NmDatePickerMonthModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmDatePickerMonthModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NmDatePickerMonthModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

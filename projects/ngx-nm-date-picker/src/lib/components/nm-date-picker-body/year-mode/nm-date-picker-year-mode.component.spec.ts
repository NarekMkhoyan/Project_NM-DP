import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmDatePickerYearModeComponent } from './nm-date-picker-year-mode.component';

describe('NmDatePickerYearModeComponent', () => {
  let component: NmDatePickerYearModeComponent;
  let fixture: ComponentFixture<NmDatePickerYearModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmDatePickerYearModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NmDatePickerYearModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

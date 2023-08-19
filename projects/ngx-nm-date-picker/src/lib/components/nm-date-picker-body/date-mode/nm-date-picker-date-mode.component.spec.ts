import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmDatePickerDateModeComponent } from './nm-date-picker-date-mode.component';

describe('NmDatePickerDateModeComponent', () => {
  let component: NmDatePickerDateModeComponent;
  let fixture: ComponentFixture<NmDatePickerDateModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmDatePickerDateModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NmDatePickerDateModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

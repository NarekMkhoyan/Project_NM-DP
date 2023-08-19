import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmDatePickerComponent } from './nm-date-picker.component';

describe('NmDatePickerComponent', () => {
  let component: NmDatePickerComponent;
  let fixture: ComponentFixture<NmDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NmDatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NmDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

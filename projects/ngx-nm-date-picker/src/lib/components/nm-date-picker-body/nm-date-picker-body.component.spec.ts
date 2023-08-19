import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmDatePickerBodyComponent } from './nm-date-picker-body.component';

describe('NmDatePickerBodyComponent', () => {
  let component: NmDatePickerBodyComponent;
  let fixture: ComponentFixture<NmDatePickerBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmDatePickerBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NmDatePickerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

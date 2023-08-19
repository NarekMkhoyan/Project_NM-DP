import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmDatePickerHeaderComponent } from './nm-date-picker-header.component';

describe('NmDatePickerHeaderComponent', () => {
  let component: NmDatePickerHeaderComponent;
  let fixture: ComponentFixture<NmDatePickerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmDatePickerHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NmDatePickerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

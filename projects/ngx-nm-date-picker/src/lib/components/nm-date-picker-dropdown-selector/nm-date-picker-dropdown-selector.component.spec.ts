import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmDatePickerDropdownSelectorComponent } from './nm-date-picker-dropdown-selector.component';

describe('NmDatePickerDropdownSelectorComponent', () => {
  let component: NmDatePickerDropdownSelectorComponent;
  let fixture: ComponentFixture<NmDatePickerDropdownSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmDatePickerDropdownSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NmDatePickerDropdownSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

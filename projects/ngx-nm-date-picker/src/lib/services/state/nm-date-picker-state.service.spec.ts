import { TestBed } from '@angular/core/testing';

import { NmDatePickerStateService } from './nm-date-picker-state.service';

describe('NmDatePickerStateService', () => {
  let service: NmDatePickerStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NmDatePickerStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

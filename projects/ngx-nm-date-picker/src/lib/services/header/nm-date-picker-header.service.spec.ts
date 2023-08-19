import { TestBed } from '@angular/core/testing';

import { NmDatePickerHeaderService } from './nm-date-picker-header.service';

describe('NmDatePickerHeaderService', () => {
  let service: NmDatePickerHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NmDatePickerHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

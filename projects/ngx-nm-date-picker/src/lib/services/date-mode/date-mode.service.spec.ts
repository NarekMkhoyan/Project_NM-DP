import { TestBed } from '@angular/core/testing';

import { DateModeService } from './date-mode.service';

describe('DateModeService', () => {
  let service: DateModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

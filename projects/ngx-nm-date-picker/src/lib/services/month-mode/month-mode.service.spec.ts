import { TestBed } from '@angular/core/testing';

import { MonthModeService } from './month-mode.service';

describe('MonthModeService', () => {
  let service: MonthModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

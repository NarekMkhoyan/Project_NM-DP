import { TestBed } from '@angular/core/testing';

import { YearModeService } from './year-mode.service';

describe('YearModeService', () => {
  let service: YearModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

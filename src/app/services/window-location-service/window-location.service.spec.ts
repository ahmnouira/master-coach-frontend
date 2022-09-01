import { TestBed } from '@angular/core/testing';

import { WindowLocationService } from './window-location.service';

describe('WindowLocationService', () => {
  let service: WindowLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

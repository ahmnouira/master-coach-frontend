import { TestBed } from '@angular/core/testing';

import { GoogleApiWrapperService } from './google-api-wrapper.service';

describe('GoogleApiWrapperService', () => {
  let service: GoogleApiWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleApiWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

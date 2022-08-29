import { TestBed } from '@angular/core/testing';

import { AccountVerifiedGuard } from './account-verified.guard';

describe('AccountVerifiedGuard', () => {
  let guard: AccountVerifiedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountVerifiedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

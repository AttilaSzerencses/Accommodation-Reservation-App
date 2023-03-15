import { TestBed } from '@angular/core/testing';

import { AccommodationProviderGuard } from './accommodation-provider.guard';

describe('AccommodationProviderGuard', () => {
  let guard: AccommodationProviderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccommodationProviderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

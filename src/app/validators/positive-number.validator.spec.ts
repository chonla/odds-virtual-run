import { TestBed } from '@angular/core/testing';

import { PositiveNumberValidator } from './positive-number.validator';

describe('PositiveNumberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PositiveNumberValidator = TestBed.get(PositiveNumberValidator);
    expect(service).toBeTruthy();
  });
});

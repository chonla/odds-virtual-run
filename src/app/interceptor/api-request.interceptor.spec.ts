import { TestBed } from '@angular/core/testing';

import { ApiRequestInterceptor } from './api-request.interceptor';

describe('ApiRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiRequestInterceptor = TestBed.get(ApiRequestInterceptor);
    expect(service).toBeTruthy();
  });
});

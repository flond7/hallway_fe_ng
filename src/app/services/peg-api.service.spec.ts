import { TestBed } from '@angular/core/testing';

import { PegApiService } from './peg-api.service';

describe('PegApiService', () => {
  let service: PegApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PegApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

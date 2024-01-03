import { TestBed } from '@angular/core/testing';

import { UtentiApiService } from './utenti-api.service';

describe('UtentiApiService', () => {
  let service: UtentiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtentiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

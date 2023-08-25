import { TestBed } from '@angular/core/testing';

import { AccessoAttiApiService } from './peg-api.service';

describe('AccessoAttiApiService', () => {
  let service: AccessoAttiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessoAttiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

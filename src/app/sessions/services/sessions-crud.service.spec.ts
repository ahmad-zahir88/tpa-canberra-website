import { TestBed } from '@angular/core/testing';

import { SessionsCrudService } from './sessions-crud.service';

describe('SessionsCrudService', () => {
  let service: SessionsCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionsCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

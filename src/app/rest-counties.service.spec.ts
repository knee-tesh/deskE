import { TestBed, inject } from '@angular/core/testing';

import { RestCountiesService } from './rest-counties.service';

describe('RestCountiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestCountiesService]
    });
  });

  it('should be created', inject([RestCountiesService], (service: RestCountiesService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeadersDataService } from './headersData.service';

describe('Service: HeadersData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeadersDataService]
    });
  });

  it('should ...', inject([HeadersDataService], (service: HeadersDataService) => {
    expect(service).toBeTruthy();
  }));
});

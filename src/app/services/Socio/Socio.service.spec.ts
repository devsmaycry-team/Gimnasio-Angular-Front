/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SocioService } from './Socio.service';

describe('Service: Socio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocioService]
    });
  });

  it('should ...', inject([SocioService], (service: SocioService) => {
    expect(service).toBeTruthy();
  }));
});

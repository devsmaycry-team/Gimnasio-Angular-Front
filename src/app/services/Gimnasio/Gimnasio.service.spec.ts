/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GimnasioService } from './Gimnasio.service';

describe('Service: Gimnasio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GimnasioService]
    });
  });

  it('should ...', inject([GimnasioService], (service: GimnasioService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClaseService } from './Clase.service';

describe('Service: Clase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClaseService]
    });
  });

  it('should ...', inject([ClaseService], (service: ClaseService) => {
    expect(service).toBeTruthy();
  }));
});

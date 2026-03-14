/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedicionesService } from './Mediciones.service';

describe('Service: Mediciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicionesService]
    });
  });

  it('should ...', inject([MedicionesService], (service: MedicionesService) => {
    expect(service).toBeTruthy();
  }));
});

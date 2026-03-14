/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InscripcionClasesService } from './InscripcionClases.service';

describe('Service: InscripcionClases', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InscripcionClasesService]
    });
  });

  it('should ...', inject([InscripcionClasesService], (service: InscripcionClasesService) => {
    expect(service).toBeTruthy();
  }));
});

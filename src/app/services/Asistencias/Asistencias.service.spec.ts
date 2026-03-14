/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsistenciasService } from './Asistencias.service';

describe('Service: Asistencias', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsistenciasService]
    });
  });

  it('should ...', inject([AsistenciasService], (service: AsistenciasService) => {
    expect(service).toBeTruthy();
  }));
});

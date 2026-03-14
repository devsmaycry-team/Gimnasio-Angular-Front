/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistroEjercicioService } from './RegistroEjercicio.service';

describe('Service: RegistroEjercicio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroEjercicioService]
    });
  });

  it('should ...', inject([RegistroEjercicioService], (service: RegistroEjercicioService) => {
    expect(service).toBeTruthy();
  }));
});

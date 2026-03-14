/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EntrenadorService } from './Entrenador.service';

describe('Service: Entrenador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntrenadorService]
    });
  });

  it('should ...', inject([EntrenadorService], (service: EntrenadorService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiasRutinaService } from './DiasRutina.service';

describe('Service: DiasRutina', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiasRutinaService]
    });
  });

  it('should ...', inject([DiasRutinaService], (service: DiasRutinaService) => {
    expect(service).toBeTruthy();
  }));
});

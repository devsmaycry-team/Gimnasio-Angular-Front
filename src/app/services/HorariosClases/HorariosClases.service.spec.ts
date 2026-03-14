/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HorariosClasesService } from './HorariosClases.service';

describe('Service: HorariosClases', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorariosClasesService]
    });
  });

  it('should ...', inject([HorariosClasesService], (service: HorariosClasesService) => {
    expect(service).toBeTruthy();
  }));
});

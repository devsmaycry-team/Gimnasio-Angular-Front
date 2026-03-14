/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MembresiaService } from './Membresia.service';

describe('Service: Membresia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembresiaService]
    });
  });

  it('should ...', inject([MembresiaService], (service: MembresiaService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RutinaService } from './Rutina.service';

describe('Service: Rutina', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutinaService]
    });
  });

  it('should ...', inject([RutinaService], (service: RutinaService) => {
    expect(service).toBeTruthy();
  }));
});

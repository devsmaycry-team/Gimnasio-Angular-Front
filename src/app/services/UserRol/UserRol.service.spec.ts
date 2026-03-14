/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserRolService } from './UserRol.service';

describe('Service: UserRol', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRolService]
    });
  });

  it('should ...', inject([UserRolService], (service: UserRolService) => {
    expect(service).toBeTruthy();
  }));
});

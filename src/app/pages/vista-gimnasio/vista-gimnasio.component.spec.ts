import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGimnasioComponent } from './vista-gimnasio.component';

describe('VistaGimnasioComponent', () => {
  let component: VistaGimnasioComponent;
  let fixture: ComponentFixture<VistaGimnasioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGimnasioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaGimnasioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

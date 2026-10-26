import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservations } from './reservations';
import { ActivatedRoute } from '@angular/router';

describe('Reservations', () => {
  let component: Reservations;
  let fixture: ComponentFixture<Reservations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reservations],
      providers:[
        {
        provide: ActivatedRoute,
        useValue:{
          snapshot:{queryParamMap:{get:()=>null}},
        },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Reservations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject a reservation date before today', async() => {
    component.reserva.update((datos) => ({
      ...datos,
      fecha: '2000-01-01',
    }));

    await component.confirmarReserva();

    expect(component.confirmado).toBe(false);
    expect(component.error).toBe('La fecha de la reserva no puede ser anterior a hoy.',

    );
  });
});

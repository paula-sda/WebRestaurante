import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservations } from './reservations';

describe('Reservations', () => {
  let component: Reservations;
  let fixture: ComponentFixture<Reservations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reservations],
    }).compileComponents();

    fixture = TestBed.createComponent(Reservations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject a reservation date before today', () => {
    component.fecha = '2000-01-01';

    component.confirmarReserva({ invalid: true });

    expect(component.confirmado).toBe(false);
    expect(component.error).toBe('La fecha de la reserva no puede ser anterior a hoy.');
  });
});

import { Component,inject,signal } from '@angular/core';
import {form, FormField,required} from '@angular/forms/signals';
import { RouterLink, Router } from '@angular/router';
import type { HomeReservationForm } from '../../models/reservation';
import { RESERVATION_HOURS, PERSON_NUMBER } from '../../data/reservation-options';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormField],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);
  reservationHours = RESERVATION_HOURS;
  personNumber = PERSON_NUMBER;
  
  reserva=signal<HomeReservationForm>({
    date:this.fechaActual(),
    hour: '20:00',
    persons:'2',

  });

  reservaForm = form(this.reserva, (path) => { 
    required(path.date);
    required(path.hour);
    required(path.persons);
  });
  
  fechaActual(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  reservar(): void {
    if( this.reservaForm().invalid()){
      return;
    }
    const datos=this.reserva();

    void this.router.navigate(['/reservas'], {
      queryParams: {
        fecha: datos.date,
        hora: datos.hour,
        personas: datos.persons,
      },
    });
  }

}

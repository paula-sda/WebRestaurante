import { Component ,signal, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../services/email';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {form, FormField,email,minLength,pattern,required} from '@angular/forms/signals';
import type { ReservationForm } from '../../models/reservation';
import { RESERVATION_HOURS, PERSON_NUMBER } from '../../data/reservation-options';


@Component({
  selector: 'app-reservations',
  imports: [MatTooltipModule, MatButtonModule, FormField],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css',
})

export class Reservations {

  private route = inject(ActivatedRoute);
  private emailService = inject(EmailService);

  horasReserva = RESERVATION_HOURS;
  opcionesPersonas = PERSON_NUMBER;

  reserva=signal<ReservationForm>({
    date:this.fechaActual(),
    hour: '20:00',
    persons:'2',
    name: '',
    email: '',
    phone: '',
  });

  reservaForm = form(this.reserva, (path) => { 
    required(path.date);
    required(path.hour);
    required(path.persons);
    required(path.name);
    minLength(path.name,2);
    required(path.email);
    email(path.email);
    required(path.phone);
    pattern(path.phone, /^[0-9+() -]{9,16}$/);
  });
  

  error='';
  confirmed = false;
  sent = false;
  minDate = this.fechaActual();

   constructor(){
    this.reserva.update((datos)=>({
      ...datos,
      date:
        this.route.snapshot.queryParamMap.get('fecha') || this.fechaActual(),
      hour:
        this.route.snapshot.queryParamMap.get('hora') || '20:00',
      persons: this.route.snapshot.queryParamMap.get('personas') || '2',

    }));
   }

   get fechaInvalida(): boolean{
    const fecha = this.reserva().date;
    return fecha !==''&& fecha<this.minDate;
   }

   fechaActual(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth()+1).padStart(2,'0');
    const day = String(today.getDate()).padStart(2,'0');

    return `${year}-${month}-${day}`;

   }

   async confirmarReserva(): Promise<void>{
    this.error = '';
    this.confirmed= false;

    const data = this.reserva();

    if(data.date < this.minDate){
      this.error='La fecha de la reserva no puede ser anterior a hoy.';
      return;
    }

    if(this.reservaForm().invalid()){
      this.error='Revisa los datos introducidos antes de confirmar la reserva.';
      return;
    }

    if(data.date=== '2027-01-01' && data.hour ==='20:30'){
      this.error='Lo sentimos, no hay disponibilidad para esa fecha y hora.';
      return;
    }

    this.sent = true;
    try {
      await this.emailService.sendReservationConfirmation({
        email: data.email,
        nombre: data.name,
        fecha: data.date,
        hora: data.hour,
        personas: Number(data.persons),
        telefono: data.phone,
      });
      this.confirmed = true;
    } catch (error) {
      console.error('No se pudo enviar el correo de confirmación:', error);
      this.error = 'No se pudo enviar el correo de confirmación. Inténtalo de nuevo más tarde.';
    } finally {
      this.sent = false;
    }
   }
}

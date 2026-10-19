import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-reservations',
  imports: [FormsModule, MatTooltipModule, MatButtonModule],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css',
})
export class Reservations {
  fecha= '';
  hora= '20:00';
  personas=2;

  nombre = '';
  email = '';
  telefono = '';

  error='';
  confirmado = false;
  enviando = false;
   minFecha = this.fechaActual();

   constructor(
    private route: ActivatedRoute,
    private emailService: EmailService,
   ){
    this.fecha=this.route.snapshot.queryParamMap.get('fecha') || this.fechaActual();
    this.hora=this.route.snapshot.queryParamMap.get('hora') || '20:00';
    this.personas = Number(this.route.snapshot.queryParamMap.get('personas') || 2);
   }

   fechaActual(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth()+1).padStart(2,'0');
    const dia = String(hoy.getDate()).padStart(2,'0');

    return `${anio}-${mes}-${dia}`;

   }

   async confirmarReserva(form: { invalid: boolean | null }): Promise<void>{
    this.error = '';
    this.confirmado= false;

    if(this.fecha < this.minFecha){
      this.error='La fecha de la reserva no puede ser anterior a hoy.';
      return;
    }

    if(form.invalid){
      this.error='Revisa los datos introducidos antes de confirmar la reserva.';
      return;
    }

    if(this.fecha=== '2027-01-01' && this.hora ==='20:30'){
      this.error='Lo sentimos, no hay disponibilidad para esa fecha y hora.';
      return;
    }

    this.enviando = true;
    try {
      await this.emailService.sendReservationConfirmation({
        email: this.email,
        nombre: this.nombre,
        fecha: this.fecha,
        hora: this.hora,
        personas: this.personas,
        telefono: this.telefono,
      });
      this.confirmado = true;
    } catch (error) {
      console.error('No se pudo enviar el correo de confirmación:', error);
      this.error = 'No se pudo enviar el correo de confirmación. Inténtalo de nuevo más tarde.';
    } finally {
      this.enviando = false;
    }
   }
}

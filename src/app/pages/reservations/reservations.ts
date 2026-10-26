import { Component ,signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../services/email';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {form, FormField,email,minLength,pattern,required} from '@angular/forms/signals';
@Component({
  selector: 'app-reservations',
  imports: [MatTooltipModule, MatButtonModule, FormField],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css',
})
export class Reservations {
  reserva=signal({
    fecha:this.fechaActual(),
    hora: '20:00',
    personas:'2',
    nombre: '',
    email: '',
    telefono: '',
  });

  reservaForm = form(this.reserva, (path) => { 
    required(path.fecha);
    required(path.hora);
    required(path.personas);
    required(path.nombre);
    minLength(path.nombre,2);
    required(path.email);
    email(path.email);
    required(path.telefono);
    pattern(path.telefono, /^[0-9+() -]{9,16}$/);
  });
  

  error='';
  confirmado = false;
  enviando = false;
  minFecha = this.fechaActual();

   constructor(
    private route: ActivatedRoute,
    private emailService: EmailService,
   ){
    this.reserva.update((datos)=>({
      ...datos,
      fecha:
        this.route.snapshot.queryParamMap.get('fecha') || this.fechaActual(),
      hora:
        this.route.snapshot.queryParamMap.get('hora') || '20:00',
      personas: this.route.snapshot.queryParamMap.get('personas') || '2',

    }));
   }

   get fechaInvalida(): boolean{
    const fecha = this.reserva().fecha;
    return fecha !==''&& fecha<this.minFecha;
   }

   fechaActual(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth()+1).padStart(2,'0');
    const dia = String(hoy.getDate()).padStart(2,'0');

    return `${anio}-${mes}-${dia}`;

   }

   async confirmarReserva(): Promise<void>{
    this.error = '';
    this.confirmado= false;

    const datos = this.reserva();

    if(datos.fecha < this.minFecha){
      this.error='La fecha de la reserva no puede ser anterior a hoy.';
      return;
    }

    if(this.reservaForm().invalid()){
      this.error='Revisa los datos introducidos antes de confirmar la reserva.';
      return;
    }

    if(datos.fecha=== '2027-01-01' && datos.hora ==='20:30'){
      this.error='Lo sentimos, no hay disponibilidad para esa fecha y hora.';
      return;
    }

    this.enviando = true;
    try {
      await this.emailService.sendReservationConfirmation({
        email: datos.email,
        nombre: datos.nombre,
        fecha: datos.fecha,
        hora: datos.hora,
        personas: Number(datos.personas),
        telefono: datos.telefono,
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

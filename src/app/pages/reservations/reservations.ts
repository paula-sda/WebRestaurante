import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservations',
  imports: [FormsModule],
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
   minFecha = this.fechaActual();

   constructor(private route: ActivatedRoute){
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

   confirmarReserva(form: { invalid: boolean | null }){
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
    this.confirmado=true;
   }
}

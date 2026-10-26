import { Component,signal } from '@angular/core';
import {form, FormField,required} from '@angular/forms/signals';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink, FormField],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  reserva=signal({
    fecha:this.fechaActual(),
    hora: '20:00',
    personas:'2',

  });

  reservaForm = form(this.reserva, (path) => { 
    required(path.fecha);
    required(path.hora);
    required(path.personas);
  });
  

  constructor(private router: Router) {}

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
        fecha: datos.fecha,
        hora: datos.hora,
        personas: datos.personas,
      },
    });
  }

}

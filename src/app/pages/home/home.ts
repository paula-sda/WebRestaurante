import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  fecha = this.fechaActual();
  hora= '20:00';
  personas =2;

  constructor(private router: Router) {}

  fechaActual(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  reservar(): void {
    void this.router.navigate(['/reservas'], {
      queryParams: {
        fecha: this.fecha,
        hora: this.hora,
        personas: this.personas,
      },
    });
  }

}

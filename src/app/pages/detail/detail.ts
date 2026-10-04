import { Component,signal } from '@angular/core';
import { Drink } from '../../models/drink';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  drink=signal<Drink|null>(null);
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('ID del drink:', id);

      this.http.get<any>(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .subscribe(resultado => {
            const bebida = resultado.drinks[0];
              bebida.price = this.getPrice(bebida.idDrink);
              this.drink.set(bebida);
            console.log('Bebida:', this.drink());
        },
        error => {
          console.error('Error en la peticion', error);

          });
        });

        }

    getPrice(idDrink: string): number {
      const id = Number(idDrink);

      const price = 5 + (id %6) * 0.5;
      return price;
    }
}

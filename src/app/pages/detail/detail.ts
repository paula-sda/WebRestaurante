import { Component,signal } from '@angular/core';
import { Drink } from '../../models/drink';
import { ActivatedRoute } from '@angular/router';
import {RouterLink} from '@angular/router';
import { DrinkService } from '../../services/drink';

@Component({
  selector: 'app-detail',
  imports: [RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  drink=signal<Drink|null>(null);
  ingredients = signal<{name: string, image: string}[]>([]);

  constructor(
    private drinkService: DrinkService,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('ID del drink:', id);

      this.drinkService.getDrinkById(id).subscribe(resultado => {
            const bebida = resultado.drinks[0];
            bebida.price = this.drinkService.getPrice(bebida.idDrink);
            this.drink.set(bebida);

            const ingredientList: {name: string, image: string}[] = [];

            for (let i = 1; i <= 15; i++) {
              const nombre = bebida[`strIngredient${i}`];
              if (nombre) {
                ingredientList.push({ 
                  name: nombre, 
                  image: `https://www.thecocktaildb.com/images/ingredients/${nombre}.png` 
                });
              }
            }
            this.ingredients.set(ingredientList);

            console.log('Bebida:', this.drink());
        },
        error => {
          console.error('Error en la peticion', error);

          });
        });

        }

  
}

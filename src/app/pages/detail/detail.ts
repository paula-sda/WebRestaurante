import { Component, signal, inject } from '@angular/core';
import { Drink } from '../../models/drink';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FALLBACK_DRINKS } from '../../data/fallback-drinks';
import { DrinkService } from '../../services/drink';

@Component({
  selector: 'app-detail',
  imports: [RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  private drinkService = inject(DrinkService);
  private route = inject(ActivatedRoute);

  drink = signal<Drink | null>(null);
  ingredients = signal<{ name: string; image: string }[]>([]);

  usePlaceholderImage(event: Event): void {
    const image = event.target;
    if (image instanceof HTMLImageElement && !image.src.endsWith('/images/img2.jpg')) {
      image.src = '/images/img2.jpg';
    }
  }

  constructor() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('ID del drink:', id);

      const localDrink = FALLBACK_DRINKS.find((drink) => drink.idDrink === id);
      if (localDrink) {
        this.drink.set(localDrink);
        this.ingredients.set(localDrink.ingredients ?? []);
        return;
      }

      this.drinkService.getDrinkById(id).subscribe(
        (resultado) => {
          const bebida = resultado.drinks[0];
          bebida.price = this.drinkService.getPrice(bebida.idDrink);
          this.drink.set(bebida);

          const ingredientList: { name: string; image: string }[] = [];

          for (let i = 1; i <= 15; i++) {
            const nombre = bebida[`strIngredient${i}`];
            if (nombre) {
              ingredientList.push({
                name: nombre,
                image: `https://www.thecocktaildb.com/images/ingredients/${nombre}.png`,
              });
            }
          }
          this.ingredients.set(ingredientList);

          console.log('Bebida:', this.drink());
        },
        (error) => {
          console.error('Error en la peticion', error);
        },
      );
    });
  }
}

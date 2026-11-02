import { Component, signal, computed, inject } from '@angular/core';
import { firstValueFrom, forkJoin, timeout } from 'rxjs';

import { DrinkCard } from '../../components/drink-card/drink-card';
import { FALLBACK_DRINKS } from '../../data/fallback-drinks';
import { Drink } from '../../models/drink';
import { DrinkService } from '../../services/drink';

@Component({
  selector: 'app-menu',
  imports: [DrinkCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private drinkService = inject(DrinkService);

  drinks = signal<Drink[]>([]);
  selectedType = signal('all');
  minPrice = signal(5);
  maxPrice = signal(8);
  loading = signal(true);
  error=signal('');

  filteredDrinks = computed(() => {
    return this.drinks().filter((drink) => {
      const matchesType =
        this.selectedType() === 'all' || drink.strAlcoholic === this.selectedType();
      const matchesPrice = drink.price >= this.minPrice() && drink.price <= this.maxPrice();
      return matchesType && matchesPrice;
    });
  });

  constructor() {
    console.log('Menu creado');
    this.getDrinks();
  }

  private mapDrinks(drinks: Drink[], alcoholic: boolean): Drink[] {
    return drinks.map((drink) => ({
      ...drink,
      strAlcoholic: alcoholic ? 'Alcoholic' : 'Non-Alcoholic',
      price: this.drinkService.getPrice(drink.idDrink),
    }));
  }

  //consultado con chatgpt porque la API no devuelve todas las bebidas y tengo que sumar las alcoholicas y no alcoholicas
  //consaltado con chatgpt porque la api no contine el precio
  async getDrinks() {
    console.log('Obteniendo drinks...');
    this.loading.set(true);
    this.error.set('');
    try {
      const { alcoholicDrinks, nonAlcoholicDrinks } = await firstValueFrom(
        forkJoin({
          alcoholicDrinks: this.drinkService.getDrinks().pipe(timeout({ first: 10000 })),
          nonAlcoholicDrinks: this.drinkService
            .getNonAlcoholicDrinks()
            .pipe(timeout({ first: 10000 })),
        }),
      );
      console.log('Alcoholic drinks:', alcoholicDrinks);
      console.log('Non-Alcoholic drinks:', nonAlcoholicDrinks);

      const drinks: Drink[] = [
        ...this.mapDrinks(alcoholicDrinks.drinks, true),
        ...this.mapDrinks(nonAlcoholicDrinks.drinks, false),
      ];

      if (drinks.length === 0) {
        this.drinks.set([]);
        return;
      }

      this.drinks.set(drinks);
      console.log('Todas las bebidas:', this.drinks().length);
    } catch (error) {
      console.error('Error al obtener las bebidas:', error);
      this.useFallbackDrinks('No se pudo conectar con la API. Se muestra el menú local.');
    } finally {
      this.loading.set(false);
    }
  }

  private useFallbackDrinks(message: string): void {
    this.drinks.set(FALLBACK_DRINKS);
    this.error.set(message);
  }
}

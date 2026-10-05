import { Component,signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DrinkCard } from '../../components/drink-card/drink-card';
import { Drink } from '../../models/drink';
import{DrinkService} from '../../services/drink';

@Component({
  selector: 'app-menu',
  imports: [DrinkCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  drinks = signal<Drink[]>([]);

  constructor(private drinkService: DrinkService) {
    console.log('Menu creado');
    this.getDrinks();}

    //consultado con chatgpt porque la API no devuelve todas las bebidas y tengo que sumar las alcoholicas y no alcoholicas
    //consaltado con chatgpt porque la api no contine el precio
  async getDrinks() {

    console.log('Obteniendo drinks...');
    try{

      const alcoholicDrinks = await firstValueFrom(this.drinkService.getDrinks());
      console.log('Alcoholic drinks:', alcoholicDrinks);
      const nonAlcoholicDrinks = await firstValueFrom(this.drinkService.getNonAlcoholicDrinks());
      console.log('Non-Alcoholic drinks:', nonAlcoholicDrinks);
      
      this.drinks.set([...alcoholicDrinks.drinks.map((drink:Drink) =>({
        ...drink,
        strAlcoholic: 'Alcoholic',
        price: this.drinkService.getPrice(drink.idDrink)
      })),
      ...nonAlcoholicDrinks.drinks.map((drink:Drink) =>({
        ...drink,
        strAlcoholic: 'Non-Alcoholic',
        price: this.drinkService.getPrice(drink.idDrink)
      }))
    ]);

    console.log('Todas las bebidas:', this.drinks().length);
  }catch (error) {
    console.error('Error al obtener las bebidas:', error);
  }
}




    }


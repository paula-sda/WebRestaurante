import { Component,signal } from '@angular/core';
import { DrinkCard } from '../../components/drink-card/drink-card';
import {HttpClient} from '@angular/common/http';
import { Drink } from '../../models/drink';

@Component({
  selector: 'app-menu',
  imports: [DrinkCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  drinks = signal<Drink[]>([]);

  constructor(private http: HttpClient) {
    console.log('Menu creado');
    this.getDrinks();}

  getDrinks() {

    console.log('Obteniendo drinks...');

    this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
      .subscribe(bebidasAlcohol => {
        console.log('Beidas ALcoholicas:',bebidasAlcohol);

        this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
          .subscribe(bebidasNoAlcohol => {
            console.log('Beidas No ALcoholicas:',bebidasNoAlcohol);

            this.drinks.set([
              ...bebidasAlcohol.drinks,
              ...bebidasNoAlcohol.drinks
            ]);
          });
      },
      error => {
        console.error('Error al obtener los drinks:', error);
      });
  }
}


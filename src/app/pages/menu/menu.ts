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

    this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m')
      .subscribe(respuestaA => {
        console.log(respuestaA);

        this.drinks.set(respuestaA.drinks);
        console.log(this.drinks());
      },
      error => {
        console.error('Error al obtener los drinks:', error);
      });
  }


//Como en la API no hay un endpoint que me devuelva todos los drinks, he tenido que hacer 3 peticiones a la API para obtener los drinks que empiezan por A, B y C. He buscado la solucion con ChatGPT
/*
getDrinks() {

  this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .subscribe(respuestaA => {

      this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b')
        .subscribe(respuestaB => {

          this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=M')
            .subscribe(respuestaC => {

              this.drinks = [
                ...respuestaA.drinks,
                ...respuestaB.drinks,
                ...respuestaC.drinks
              ];

            });

        });

    });

}
*/
}


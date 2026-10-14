import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  constructor(private http: HttpClient) {}
  getDrinks() {
    return this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic ');
  }

  getNonAlcoholicDrinks() {
    return this.http.get<any>('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
  }

  getDrinkById(id: string) {
    return this.http.get<any>(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  }

  getPrice(idDrink: string) : number {
    const id = Number(idDrink);
    const price = 5 + (id % 6) * 0.5; 
    return price;
  }

}


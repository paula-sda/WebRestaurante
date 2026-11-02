export interface DrinkIngredient {
  name: string;
  image: string;
}

export interface Drink{
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strDrinkThumb: string;
  price: number;
  ingredients?: DrinkIngredient[];
  local?: boolean;
}

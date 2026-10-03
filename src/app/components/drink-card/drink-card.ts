import { Component,input } from '@angular/core';
import { Drink } from '../../models/drink';
@Component({
  selector: 'app-drink-card',
  imports: [],
  templateUrl: './drink-card.html',
  styleUrl: './drink-card.css',
})
export class DrinkCard {
  drink=input.required<Drink>();
}

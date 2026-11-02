import { Component, input } from '@angular/core';
import { Drink } from '../../models/drink';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-drink-card',
  imports: [RouterLink],
  templateUrl: './drink-card.html',
  styleUrl: './drink-card.css',
})
export class DrinkCard {
  drink=input.required<Drink>();

  usePlaceholderImage(event: Event): void {
    const image = event.target;
    if (image instanceof HTMLImageElement && !image.src.endsWith('/images/img2.jpg')) {
      image.src = '/images/img2.jpg';
    }
  }
}

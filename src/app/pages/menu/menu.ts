import { Component } from '@angular/core';
import { DrinkCard } from '../../components/drink-card/drink-card';

@Component({
  selector: 'app-menu',
  imports: [DrinkCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {}

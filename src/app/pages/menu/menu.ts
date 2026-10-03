import { Component } from '@angular/core';
import { DrinkCard } from '../../components/drink-card/drink-card';

@Component({
  selector: 'app-menu',
  imports: [DrinkCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  drinks=[
    {name:'Mojito', alcohol:true, image:'/images/img1.jpg'},
    {name:'Piña Colada', alcohol:true, image:'/images/img2.jpg'},
    {name:'Margarita', alcohol:true, image:'/images/img3.jpg'},
    {name:'Cuba Libre', alcohol:true, image:'/images/img4.jpg'},
    {name:'Daiquiri', alcohol:true, image:'/images/img5.jpg'},
    {name:'Caipirinha', alcohol:true, image:'/images/img6.jpg'},
  ]
}

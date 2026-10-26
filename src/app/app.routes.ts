import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Menu} from './pages/menu/menu';
import {Detail} from './pages/detail/detail';
import { Reservations } from './pages/reservations/reservations';


export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio | Rouge de Minuit' },
  { path: 'menu', component: Menu , title: 'Menu | Rouge de Minuit'},
  { path: 'menu/:id', component: Detail, title: 'Detalle | Rouge de Minuit' },
  { path: 'reservas', component: Reservations, title: 'Reservas | Rouge de Minuit'}

];

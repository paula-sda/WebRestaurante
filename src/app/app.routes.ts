import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Menu} from './pages/menu/menu';
import {Detail} from './pages/detail/detail';
import { Reservations } from './pages/reservations/reservations';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'menu', component: Menu },
  { path: 'menu/:id', component: Detail },
  { path: 'reservas', component: Reservations}

];

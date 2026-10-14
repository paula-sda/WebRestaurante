import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Menu } from './menu';
import { DrinkService } from '../../services/drink';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [{
        provide: DrinkService,
        useValue: {
          getDrinks: () => of({ drinks: [] }),
          getNonAlcoholicDrinks: () => of({ drinks: [] }),
          getPrice: () => 5,
        },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show only non-alcoholic drinks when that filter is selected', () => {
    component.drinks.set([
      { idDrink: '1', strDrink: 'Cocktail', strAlcoholic: 'Alcoholic', strDrinkThumb: '', price: 5 },
      { idDrink: '2', strDrink: 'Mocktail', strAlcoholic: 'Non-Alcoholic', strDrinkThumb: '', price: 5 },
    ]);
    component.selectedType.set('Non-Alcoholic');

    expect(component.filteredDrinks().map(drink => drink.idDrink)).toEqual(['2']);
  });
});

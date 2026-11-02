import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Menu } from './menu';
import { FALLBACK_DRINKS } from '../../data/fallback-drinks';
import { DrinkService } from '../../services/drink';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [
        provideRouter([]),
        {
          provide: DrinkService,
          useValue: {
            getDrinks: () => of({ drinks: [] }),
            getNonAlcoholicDrinks: () => of({ drinks: [] }),
            getPrice: () => 5,
          },
        },
      ],
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

  it('should provide ten local drinks with five of each type and prices from 6 to 8 euros', () => {
    expect(FALLBACK_DRINKS).toHaveLength(10);
    expect(FALLBACK_DRINKS.filter(drink => drink.strAlcoholic === 'Alcoholic')).toHaveLength(5);
    expect(FALLBACK_DRINKS.filter(drink => drink.strAlcoholic === 'Non-Alcoholic')).toHaveLength(5);
    expect(FALLBACK_DRINKS.every(drink => drink.price >= 6 && drink.price <= 8)).toBe(true);
    expect(FALLBACK_DRINKS.every(drink => drink.ingredients && drink.ingredients.length > 0)).toBe(true);
    expect(
      FALLBACK_DRINKS.every((drink) =>
        drink.ingredients?.every((item) => item.image.startsWith('/images/ingredients/')),
      ),
    ).toBe(true);
  });

  it('should keep local drinks visible and stop loading when the API fails', async () => {
    const drinkService = TestBed.inject(DrinkService);
    vi.spyOn(drinkService, 'getDrinks').mockReturnValue(
      throwError(() => new Error('Request failed')),
    );

    await component.getDrinks();

    expect(component.loading()).toBe(false);
    expect(component.drinks()).toEqual(FALLBACK_DRINKS);
    expect(component.error()).toContain('Se muestra el menú local');
  });

  it('should not use fallback drinks when the API succeeds with an empty result', async () => {
    await component.getDrinks();

    expect(component.loading()).toBe(false);
    expect(component.drinks()).toEqual([]);
    expect(component.error()).toBe('');
  });
});

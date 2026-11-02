import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Detail } from './detail';
import { DrinkService } from '../../services/drink';

describe('Detail', () => {
  let component: Detail;
  let fixture: ComponentFixture<Detail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 'local-mojito' }) },
        },
        {
          provide: DrinkService,
          useValue: { getDrinkById: vi.fn(), getPrice: () => 7 },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Detail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show fallback ingredients without requesting the API', () => {
    expect(component.drink()?.strDrink).toBe('Mojito');
    expect(component.ingredients().map(ingredient => ingredient.name)).toContain('Ron blanco');
    expect(TestBed.inject(DrinkService).getDrinkById).not.toHaveBeenCalled();
  });
});

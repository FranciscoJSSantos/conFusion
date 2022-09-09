import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor() {}

  getDishes(): Observable<Dish[] | undefined> {
    return of(DISHES).pipe(delay(2000));
}

  getDish(id: string): Observable<Dish | undefined> {
    return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish | undefined> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
}

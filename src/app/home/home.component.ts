import { Component, Inject, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';

import { PromotionService } from '../services/promotion.service';
import { Promotion } from '../shared/promotion';

import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dish: Dish | undefined;
  dishErrMess?: string;
  leaderErrMess?: string;
  promotionErrMess?: string;
  promotion: Promotion | undefined;
  leader: Leader | undefined;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL: any
  ) {}

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe(
      (dish) => (this.dish = dish),
      (errmess) => (this.dishErrMess = errmess)
    );
    this.promotionService.getFeaturedPromotion().subscribe(
      (promotion) => (this.promotion = promotion),
      (errmess) => (this.promotionErrMess = errmess)
    );
    this.leaderService.getFeaturedLeader().subscribe(
      (leader) => (this.leader = leader),
      (errmess) => (this.leaderErrMess = errmess)
    );
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
})
export class AboutComponent implements OnInit {
  leader: Leader[] | undefined;
  promotionErrMess?: string;

  constructor(
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL: any
  ) {}

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(
      (leader) => (this.leader = leader),
      (errmess) => (this.promotionErrMess = errmess)
    );
  }
}

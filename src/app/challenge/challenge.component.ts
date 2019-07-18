import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../challenge.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
})
export class ChallengeComponent implements OnInit {
  challenge$: Observable<string>;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit() {
    this.challenge$ = this.challengeService.currentChallenge$;
  }
}

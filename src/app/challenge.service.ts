import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  public currentChallenge$: Subject<string> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getChallenge();
  }

  private getChallenge() {
    this.http
      .get<{ description: string }>('/api/challenge')
      .pipe(map(challengeResponse => challengeResponse.description))
      .subscribe(challenge => this.currentChallenge$.next(challenge));
  }
}

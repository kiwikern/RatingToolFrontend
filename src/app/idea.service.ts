import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Idea {
  id: string;
  text: string;
}

interface Rating {
  id: string;
  value: number;
  novelty: number;
}

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  private static readonly IDEAS_URL = '/api/ideas';
  private static readonly RATINGS_URL = '/api/ratings';

  private sessionId: string;
  private ideas: Idea[];
  private ratings: Rating[] = [];
  private attentionQuestionAnswer: string;
  public currentIdea$: Subject<Idea> = new BehaviorSubject(null);
  public currentIndex = 0;
  public ideas$: Subject<Idea[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient, private matDialog: MatDialog, private router: Router) {}

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
    this.recoverStateFromLocalStorage();
    this.getIdeas();
  }

  getNextIdea(): void {
    if (this.currentIndex < this.ideas.length) {
      this.saveToLocalStorage();
      this.currentIdea$.next(this.ideas[this.currentIndex]);
      this.currentIndex++;
      if (this.currentIndex === Math.round(this.ideas.length / 2)) {
        this.router.navigate(['attention'], { queryParamsHandling: 'merge' });
      }
    } else {
      this.currentIdea$.next(null);
      this.matDialog
        .open(SubmitDialogComponent)
        .afterClosed()
        .pipe(switchMap(() => this.submitRatings()))
        .subscribe();
    }
  }

  addRating(id: string, novelty: number, value: number) {
    this.ratings.push({ id, novelty, value });
    this.saveToLocalStorage();
  }

  setAttentionAnswer(attentionQuestionAnswer: string) {
    this.attentionQuestionAnswer = attentionQuestionAnswer;
    this.router.navigate(['rate'], { queryParamsHandling: 'merge' });
  }

  private getIdeas(): void {
    const params = new HttpParams().set('sessionId', this.sessionId);
    this.http.get<Idea[]>(IdeaService.IDEAS_URL, { params }).subscribe(ideas => {
      this.ideas = ideas;
      this.ideas$.next(ideas);
      this.getNextIdea();
    });
  }

  private submitRatings(): Observable<any> {
    // TODO: on success redirect to /hit/end.html
    const body = {
      sessionId: this.sessionId,
      ratings: this.ratings,
      attentionQuestionAnswer: this.attentionQuestionAnswer,
    };
    return this.http.post(IdeaService.RATINGS_URL, body);
  }

  private recoverStateFromLocalStorage() {
    try {
      const state = JSON.parse(localStorage.getItem(this.getLocalStorageKey()));
      this.ratings = state.ratings;
      this.ideas = state.ideas;
      this.currentIndex = state.currentIndex;
      if (this.ratings && this.ratings.length > 0) {
        this.router.navigate(['rate'], { queryParamsHandling: 'merge' });
      }
    } catch (e) {
      console.log('New session. No saved state found.');
    }
  }

  private saveToLocalStorage() {
    try {
      const state = { ratings: this.ratings, currentIndex: this.currentIndex, ideas: this.ideas };
      localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(state));
    } catch (e) {
      console.error('Saving state to localStorage failed', e);
    }
  }

  private getLocalStorageKey() {
    return `RatingTool:${this.sessionId}`;
  }
}

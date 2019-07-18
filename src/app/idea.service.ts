import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';
import { switchMap } from 'rxjs/operators';

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

  private userId: string;
  public currentIndex = 0;
  public ideas: Idea[];
  private ratings: Rating[] = [];
  public currentIdea$: Subject<Idea> = new Subject();

  constructor(private http: HttpClient, private matDialog: MatDialog) {
    this.getIdeas();
  }

  setUser(userId: string) {
    this.userId = userId;
    this.recoverStateFromLocalStorage();
  }

  getNextIdea(): void {
    if (this.currentIndex < this.ideas.length) {
      this.saveToLocalStorage();
      this.currentIdea$.next(this.ideas[this.currentIndex]);
      this.currentIndex++;
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

  private getIdeas(): void {
    this.http.get<Idea[]>(IdeaService.IDEAS_URL).subscribe(ideas => {
      this.ideas = ideas;
      this.getNextIdea();
    });
  }

  private submitRatings(): Observable<any> {
    const body = { userId: this.userId, ratings: this.ratings };
    return this.http.post(IdeaService.RATINGS_URL, body);
  }

  private recoverStateFromLocalStorage() {
    try {
      const state = JSON.parse(localStorage.getItem(this.getLocalStorageKey()));
      this.ratings = state.ratings;
      this.currentIndex = state.currentIndex;
    } catch (e) {
      console.log('New session. No saved state found.');
    }
  }

  private saveToLocalStorage() {
    try {
      const state = { ratings: this.ratings, currentIndex: this.currentIndex };
      localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(state));
    } catch (e) {
      console.error('Saving state to localStorage failed', e);
    }
  }

  private getLocalStorageKey() {
    return `RatingTool:${this.userId}`;
  }
}

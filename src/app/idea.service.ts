import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';
import { switchMap } from 'rxjs/operators';

export interface Idea {
  id: number;
  text: string;
}

interface Rating {
  id: number;
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
    this.getIdeas(0);
  }

  setUser(userId: string) {
    this.userId = userId;
  }

  getIdeas(page: number): void {
    const params = new HttpParams().append('page', page + '').set('size', '50');
    this.http.get<Idea[]>(IdeaService.IDEAS_URL, { params }).subscribe(ideas => {
      this.ideas = ideas;
      this.getNextIdea();
    });
  }

  getNextIdea(): void {
    if (this.currentIndex < this.ideas.length) {
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

  addRating(id: number, novelty: number, value: number) {
    this.ratings.push({ id, novelty, value });
  }

  submitRatings(): Observable<any> {
    const body = { userId: this.userId, ratings: this.ratings };
    return this.http.post(IdeaService.RATINGS_URL, body);
  }
}

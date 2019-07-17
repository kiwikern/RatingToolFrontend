import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface Idea {
  id: number;
  text: string;
}

interface Raiting {
  id: number;
  value: number;
  novelty: number;
}

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  private static readonly URL = '/api/ideas';

  private userId: string;
  private currentIndex = 0;
  private ideas: Idea[];
  private ratings: Raiting[] = [];
  public currentIdea$: Subject<Idea> = new Subject();

  constructor(private http: HttpClient) {
    this.getIdeas(0);
  }

  setUser(userId: string) {
    this.userId = userId;
  }

  getIdeas(page: number): void {
    const params = new HttpParams().append('page', page + '').set('size', '50');
    this.http.get<Idea[]>(IdeaService.URL, { params }).subscribe(ideas => {
      this.ideas = ideas;
      this.getNextIdea();
    });
  }

  getNextIdea(): void {
    this.currentIdea$.next(this.ideas[this.currentIndex]);
    this.currentIndex++;
  }

  addRating(id: number, novelty: number, value: number) {
    this.ratings.push({ id, novelty, value });
  }

  submitRatings(): Observable<any> {
    const body = { userId: this.userId, ratings: this.ratings };
    return this.http.post(IdeaService.URL, body);
  }
}

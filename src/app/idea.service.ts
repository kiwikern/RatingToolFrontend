import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface Idea {
  id: number;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  private static readonly URL = '/api/ideas';

  private userId: string;
  private currentId = 1;

  public currentIdea$ = new Subject();

  constructor(private http: HttpClient) {}

  setUser(userId: string) {
    this.userId = userId;
  }

  getIdeas(page: number): Observable<Idea[]> {
    const params = new HttpParams().append('page', page + '').set('size', '50');
    return this.http.get<Idea[]>(IdeaService.URL, { params });
  }

  getNextIdea(): Observable<Idea> {
    return this.http.get<Idea>(`${IdeaService.URL}/${this.currentId++}`);
  }

  submitRating(id: number, novelty: number, value: number): Observable<any> {
    return this.http.patch(`${IdeaService.URL}/${id}`, { id, novelty, value, userId: this.userId });
  }
}

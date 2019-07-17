import { Component, OnInit } from '@angular/core';
import { Idea, IdeaService } from './idea.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentIdea: Observable<Idea>;
  currentNovelty: number;
  currentValue: number;

  constructor(private route: ActivatedRoute, private ideaService: IdeaService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.ideaService.setUser(params.userId);
    });
    this.currentIdea = this.ideaService.getNextIdea();
  }

  submit(id, novelty, value) {
    this.currentIdea = this.ideaService.submitRating(id, novelty, value).pipe(
      switchMap(() => {
        this.currentValue = null;
        this.currentNovelty = null;
        return this.ideaService.getNextIdea();
      })
    );
  }
}

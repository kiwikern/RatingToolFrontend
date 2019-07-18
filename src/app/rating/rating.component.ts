import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea, IdeaService } from '../idea.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  currentIdea: Observable<Idea>;
  currentNovelty: number;
  currentValue: number;

  constructor(private ideaService: IdeaService) {}

  ngOnInit() {
    this.currentIdea = this.ideaService.currentIdea$;
  }

  submit(id) {
    this.ideaService.addRating(id, this.currentNovelty, this.currentValue);
    this.ideaService.getNextIdea();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea, IdeaService } from '../idea.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  currentIdea: Observable<Idea>;
  currentNovelty: number;
  currentValue: number;

  constructor(private route: ActivatedRoute, private ideaService: IdeaService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.ideaService.setUser(params.userId);
    });
    this.currentIdea = this.ideaService.currentIdea$;
  }

  submit(id) {
    this.ideaService.addRating(id, this.currentNovelty, this.currentValue);
    this.ideaService.getNextIdea();
  }
}

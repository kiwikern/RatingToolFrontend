import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Idea, IdeaService } from './idea.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  currentIdea: Observable<Idea>;
  currentNovelty: number;
  currentValue: number;

  constructor(private route: ActivatedRoute, private ideaService: IdeaService, private changeRef: ChangeDetectorRef) {}

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

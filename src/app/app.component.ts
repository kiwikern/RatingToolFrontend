import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IdeaService } from './idea.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  constructor(private route: ActivatedRoute, private ideaService: IdeaService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.ideaService.setUser(params.userId);
    });
  }
}

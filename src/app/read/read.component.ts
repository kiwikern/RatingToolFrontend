import { Component, OnInit } from '@angular/core';
import { Idea, IdeaService } from '../idea.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  ideas$: Observable<Idea[]>;

  constructor(private ideaService: IdeaService) {}

  ngOnInit() {
    this.ideas$ = this.ideaService.ideas$;
  }
}

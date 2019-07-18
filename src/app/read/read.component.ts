import { Component, OnInit } from '@angular/core';
import { Idea, IdeaService } from '../idea.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  ideas: Idea[];

  constructor(private ideaService: IdeaService) {}

  ngOnInit() {
    this.ideas = this.ideaService.ideas;
  }
}

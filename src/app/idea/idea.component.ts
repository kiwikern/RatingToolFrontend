import { Component, Input, OnInit } from '@angular/core';
import { IdeaService } from '../idea.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css'],
})
export class IdeaComponent implements OnInit {
  @Input()
  ideaText: string;

  constructor(public ideaService: IdeaService) {}

  ngOnInit() {}
}

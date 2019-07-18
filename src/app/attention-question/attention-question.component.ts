import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../idea.service';

@Component({
  selector: 'app-attention-question',
  templateUrl: './attention-question.component.html',
  styleUrls: ['./attention-question.component.css'],
})
export class AttentionQuestionComponent implements OnInit {
  attentionQuestionAnswer: string;

  constructor(private ideaService: IdeaService) {}

  ngOnInit() {}

  submit() {
    this.ideaService.setAttentionAnswer(this.attentionQuestionAnswer);
  }
}

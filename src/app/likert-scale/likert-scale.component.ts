import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-likert-scale',
  templateUrl: './likert-scale.component.html',
  styleUrls: ['./likert-scale.component.css'],
})
export class LikertScaleComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() attribute: string;
  @Output() selectValue: EventEmitter<number> = new EventEmitter();
  noveltyValues = [1, 2, 3, 4, 5, 6, 7];
  selectedNovelty: number = null;

  constructor() {}

  ngOnInit() {}
}

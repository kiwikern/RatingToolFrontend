import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionQuestionComponent } from './attention-question.component';

describe('AttentionQuestoinComponent', () => {
  let component: AttentionQuestionComponent;
  let fixture: ComponentFixture<AttentionQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttentionQuestionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatRadioModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { IdeaComponent } from './idea/idea.component';
import { LikertScaleComponent } from './likert-scale/likert-scale.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';
import { RatingComponent } from './rating/rating.component';
import { ReadComponent } from './read/read.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { AttentionQuestionComponent } from './attention-question/attention-question.component';

@NgModule({
  declarations: [
    AppComponent,
    IdeaComponent,
    LikertScaleComponent,
    SubmitDialogComponent,
    RatingComponent,
    ReadComponent,
    ChallengeComponent,
    AttentionQuestionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'read', pathMatch: 'full' },
      { path: 'read', component: ReadComponent },
      { path: 'rate', component: RatingComponent },
      { path: 'attention', component: AttentionQuestionComponent },
    ]),
    MatListModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SubmitDialogComponent],
})
export class AppModule {}

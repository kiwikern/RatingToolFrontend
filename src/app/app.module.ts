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

@NgModule({
  declarations: [AppComponent, IdeaComponent, LikertScaleComponent, SubmitDialogComponent, RatingComponent],
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
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SubmitDialogComponent],
})
export class AppModule {}

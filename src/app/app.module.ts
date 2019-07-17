import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
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

@NgModule({
  declarations: [AppComponent, IdeaComponent, LikertScaleComponent],
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
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

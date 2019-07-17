import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikertScaleComponent } from './likert-scale.component';

describe('LikertScaleComponent', () => {
  let component: LikertScaleComponent;
  let fixture: ComponentFixture<LikertScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LikertScaleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikertScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormQuizComponent } from './view-form-quiz.component';

describe('ViewFormQuizComponent', () => {
  let component: ViewFormQuizComponent;
  let fixture: ComponentFixture<ViewFormQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

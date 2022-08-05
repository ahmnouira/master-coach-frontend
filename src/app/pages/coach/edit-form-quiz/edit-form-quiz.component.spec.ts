import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormQuizComponent } from './edit-form-quiz.component';

describe('EditFormQuizComponent', () => {
  let component: EditFormQuizComponent;
  let fixture: ComponentFixture<EditFormQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

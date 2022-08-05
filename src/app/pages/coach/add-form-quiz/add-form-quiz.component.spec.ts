import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormQuizComponent } from './add-form-quiz.component';

describe('AddFormQuizComponent', () => {
  let component: AddFormQuizComponent;
  let fixture: ComponentFixture<AddFormQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

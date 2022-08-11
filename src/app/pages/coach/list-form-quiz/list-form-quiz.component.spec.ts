import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormQuizComponent } from './list-form-quiz.component';

describe('ListFormQuizComponent', () => {
  let component: ListFormQuizComponent;
  let fixture: ComponentFixture<ListFormQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFormQuizComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

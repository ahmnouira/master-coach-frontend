import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDocQuizComponent } from './mes-doc-quiz.component';

describe('MesDocQuizComponent', () => {
  let component: MesDocQuizComponent;
  let fixture: ComponentFixture<MesDocQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesDocQuizComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesDocQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

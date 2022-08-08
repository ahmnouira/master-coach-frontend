import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceEditComponent } from './competence-edit.component';

describe('CompetenceEditComponent', () => {
  let component: CompetenceEditComponent;
  let fixture: ComponentFixture<CompetenceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

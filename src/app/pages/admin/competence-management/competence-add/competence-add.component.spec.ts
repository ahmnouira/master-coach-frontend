import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceAddComponent } from './competence-add.component';

describe('CompetenceAddComponent', () => {
  let component: CompetenceAddComponent;
  let fixture: ComponentFixture<CompetenceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

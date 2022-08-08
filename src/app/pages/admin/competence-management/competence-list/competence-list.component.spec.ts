import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceListComponent } from './competence-list.component';

describe('CompetenceListComponent', () => {
  let component: CompetenceListComponent;
  let fixture: ComponentFixture<CompetenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

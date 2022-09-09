import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachExpertiseComponent } from './coach-expertise.component';

describe('CoachExpertiseComponent', () => {
  let component: CoachExpertiseComponent;
  let fixture: ComponentFixture<CoachExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachExpertiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

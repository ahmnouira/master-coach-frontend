import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCardComponent } from './coach-card.component';

describe('CoachCardComponent', () => {
  let component: CoachCardComponent;
  let fixture: ComponentFixture<CoachCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

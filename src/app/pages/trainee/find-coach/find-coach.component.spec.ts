import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCoachComponent } from './find-coach.component';

describe('FindCoachComponent', () => {
  let component: FindCoachComponent;
  let fixture: ComponentFixture<FindCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

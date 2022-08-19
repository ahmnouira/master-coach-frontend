import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPaidComponent } from './plan-paid.component';

describe('PlanPaidComponent', () => {
  let component: PlanPaidComponent;
  let fixture: ComponentFixture<PlanPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanPaidComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

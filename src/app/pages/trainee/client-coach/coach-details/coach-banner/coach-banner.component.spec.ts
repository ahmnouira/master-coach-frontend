import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachBannerComponent } from './coach-banner.component';

describe('CoachBannerComponent', () => {
  let component: CoachBannerComponent;
  let fixture: ComponentFixture<CoachBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoachBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

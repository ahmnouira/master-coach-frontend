import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSettingsComponent } from './coach-settings.component';

describe('CoachSettingsComponent', () => {
  let component: CoachSettingsComponent;
  let fixture: ComponentFixture<CoachSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

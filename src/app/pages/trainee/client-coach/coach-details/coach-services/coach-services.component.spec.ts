import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachServicesComponent } from './coach-services.component';

describe('CoachServicesComponent', () => {
  let component: CoachServicesComponent;
  let fixture: ComponentFixture<CoachServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

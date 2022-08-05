import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCoachComponent } from './detail-coach.component';

describe('DetailCoachComponent', () => {
  let component: DetailCoachComponent;
  let fixture: ComponentFixture<DetailCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

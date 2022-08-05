import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvReservationComponent } from './rdv-reservation.component';

describe('RdvReservationComponent', () => {
  let component: RdvReservationComponent;
  let fixture: ComponentFixture<RdvReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

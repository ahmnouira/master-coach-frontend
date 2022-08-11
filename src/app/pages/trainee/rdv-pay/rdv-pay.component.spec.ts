import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvPayComponent } from './rdv-pay.component';

describe('RdvPayComponent', () => {
  let component: RdvPayComponent;
  let fixture: ComponentFixture<RdvPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RdvPayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

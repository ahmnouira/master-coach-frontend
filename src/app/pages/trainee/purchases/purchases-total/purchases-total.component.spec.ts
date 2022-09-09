import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesTotalComponent } from './purchases-total.component';

describe('PurchasesTotalComponent', () => {
  let component: PurchasesTotalComponent;
  let fixture: ComponentFixture<PurchasesTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasesTotalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

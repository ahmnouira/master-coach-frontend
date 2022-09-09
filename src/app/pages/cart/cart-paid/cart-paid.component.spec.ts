import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPaidComponent } from './cart-paid.component';

describe('CartPaidComponent', () => {
  let component: CartPaidComponent;
  let fixture: ComponentFixture<CartPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartPaidComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

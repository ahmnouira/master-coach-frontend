import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesViewComponent } from './purchases-view.component';

describe('PurchasesViewComponent', () => {
  let component: PurchasesViewComponent;
  let fixture: ComponentFixture<PurchasesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasesViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

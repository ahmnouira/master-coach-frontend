import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueViewComponent } from './boutique-view.component';

describe('BoutiqueViewComponent', () => {
  let component: BoutiqueViewComponent;
  let fixture: ComponentFixture<BoutiqueViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoutiqueViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

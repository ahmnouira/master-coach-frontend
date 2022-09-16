import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueInfoComponent } from './boutique-info.component';

describe('BoutiqueInfoComponent', () => {
  let component: BoutiqueInfoComponent;
  let fixture: ComponentFixture<BoutiqueInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoutiqueInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

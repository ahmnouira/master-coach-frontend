import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueFormComponent } from './boutique-form.component';

describe('BoutiqueFormComponent', () => {
  let component: BoutiqueFormComponent;
  let fixture: ComponentFixture<BoutiqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoutiqueFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

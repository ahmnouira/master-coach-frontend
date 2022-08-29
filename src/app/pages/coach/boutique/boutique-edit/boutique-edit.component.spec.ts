import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueEditComponent } from './boutique-edit.component';

describe('BoutiqueEditComponent', () => {
  let component: BoutiqueEditComponent;
  let fixture: ComponentFixture<BoutiqueEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoutiqueEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

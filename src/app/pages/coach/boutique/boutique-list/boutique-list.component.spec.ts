import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueListComponent } from './boutique-list.component';

describe('BoutiqueListComponent', () => {
  let component: BoutiqueListComponent;
  let fixture: ComponentFixture<BoutiqueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoutiqueListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

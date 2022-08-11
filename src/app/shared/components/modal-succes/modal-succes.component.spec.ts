import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuccesComponent } from './modal-succes.component';

describe('ModalSuccesComponent', () => {
  let component: ModalSuccesComponent;
  let fixture: ComponentFixture<ModalSuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSuccesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

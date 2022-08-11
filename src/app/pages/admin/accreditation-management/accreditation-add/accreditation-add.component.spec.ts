import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationAddComponent } from './accreditation-add.component';

describe('AccreditationAddComponent', () => {
  let component: AccreditationAddComponent;
  let fixture: ComponentFixture<AccreditationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccreditationAddComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

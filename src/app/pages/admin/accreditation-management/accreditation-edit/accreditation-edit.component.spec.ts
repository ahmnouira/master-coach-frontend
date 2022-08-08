import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationEditComponent } from './accreditation-edit.component';

describe('AccreditationEditComponent', () => {
  let component: AccreditationEditComponent;
  let fixture: ComponentFixture<AccreditationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccreditationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

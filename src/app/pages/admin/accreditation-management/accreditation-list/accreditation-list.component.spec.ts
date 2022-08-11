import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationListComponent } from './accreditation-list.component';

describe('AccreditationListComponent', () => {
  let component: AccreditationListComponent;
  let fixture: ComponentFixture<AccreditationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccreditationListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

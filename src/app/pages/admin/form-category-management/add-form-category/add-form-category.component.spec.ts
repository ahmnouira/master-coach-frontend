import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormCategoryComponent } from './add-form-category.component';

describe('AddFormCategoryComponent', () => {
  let component: AddFormCategoryComponent;
  let fixture: ComponentFixture<AddFormCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

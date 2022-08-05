import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormCategoryComponent } from './edit-form-category.component';

describe('EditFormCategoryComponent', () => {
  let component: EditFormCategoryComponent;
  let fixture: ComponentFixture<EditFormCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

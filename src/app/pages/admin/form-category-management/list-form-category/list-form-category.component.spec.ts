import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormCategoryComponent } from './list-form-category.component';

describe('ListFormCategoryComponent', () => {
  let component: ListFormCategoryComponent;
  let fixture: ComponentFixture<ListFormCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFormCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

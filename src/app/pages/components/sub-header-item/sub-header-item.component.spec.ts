import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderItemComponent } from './sub-header-item.component';

describe('SubHeaderItemComponent', () => {
  let component: SubHeaderItemComponent;
  let fixture: ComponentFixture<SubHeaderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubHeaderItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubHeaderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

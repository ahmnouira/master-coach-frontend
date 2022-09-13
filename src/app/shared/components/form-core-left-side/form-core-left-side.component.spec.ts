import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoreLeftSideComponent } from './form-core-left-side.component';

describe('FormCoreLeftSideComponent', () => {
  let component: FormCoreLeftSideComponent;
  let fixture: ComponentFixture<FormCoreLeftSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCoreLeftSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCoreLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

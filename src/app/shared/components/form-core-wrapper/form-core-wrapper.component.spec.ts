import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoreWrapperComponent } from './form-core-wrapper.component';

describe('FormCoreWrapperComponent', () => {
  let component: FormCoreWrapperComponent;
  let fixture: ComponentFixture<FormCoreWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCoreWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCoreWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitledFieldComponent } from './titled-field.component';

describe('TitledFieldComponent', () => {
  let component: TitledFieldComponent;
  let fixture: ComponentFixture<TitledFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitledFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitledFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

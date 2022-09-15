import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueInfoComponent } from './value-info.component';

describe('ValueInfoComponent', () => {
  let component: ValueInfoComponent;
  let fixture: ComponentFixture<ValueInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValueInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValueInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

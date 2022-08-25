import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightImageComponent } from './right-image.component';

describe('RightImageComponent', () => {
  let component: RightImageComponent;
  let fixture: ComponentFixture<RightImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RightImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

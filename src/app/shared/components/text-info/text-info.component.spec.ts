import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInfoComponent } from './text-info.component';

describe('TextInfoComponent', () => {
  let component: TextInfoComponent;
  let fixture: ComponentFixture<TextInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

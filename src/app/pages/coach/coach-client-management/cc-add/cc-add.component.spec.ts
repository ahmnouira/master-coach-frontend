import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcAddComponent } from './cc-add.component';

describe('CcAddComponent', () => {
  let component: CcAddComponent;
  let fixture: ComponentFixture<CcAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

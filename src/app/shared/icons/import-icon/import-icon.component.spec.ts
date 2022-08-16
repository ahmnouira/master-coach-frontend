import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportIconComponent } from './import-icon.component';

describe('ImportIconComponent', () => {
  let component: ImportIconComponent;
  let fixture: ComponentFixture<ImportIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

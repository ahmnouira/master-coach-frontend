import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileImportedComponent } from './file-imported.component';

describe('FileImportedComponent', () => {
  let component: FileImportedComponent;
  let fixture: ComponentFixture<FileImportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileImportedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileImportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

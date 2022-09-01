import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsFormComponent } from './documents-form.component';

describe('DocumentsFormComponent', () => {
  let component: DocumentsFormComponent;
  let fixture: ComponentFixture<DocumentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

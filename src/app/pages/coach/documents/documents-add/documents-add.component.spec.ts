import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsAddComponent } from './documents-add.component';

describe('DocumentsAddComponent', () => {
  let component: DocumentsAddComponent;
  let fixture: ComponentFixture<DocumentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

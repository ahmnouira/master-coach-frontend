import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsViewComponent } from './documents-view.component';

describe('DocumentsViewComponent', () => {
  let component: DocumentsViewComponent;
  let fixture: ComponentFixture<DocumentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

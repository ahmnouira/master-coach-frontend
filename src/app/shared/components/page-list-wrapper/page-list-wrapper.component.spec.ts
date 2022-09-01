import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListWrapperComponent } from './page-list-wrapper.component';

describe('PageListWrapperComponent', () => {
  let component: PageListWrapperComponent;
  let fixture: ComponentFixture<PageListWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageListWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

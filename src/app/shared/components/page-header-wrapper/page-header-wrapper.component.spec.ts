import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderWrapperComponent } from './page-header-wrapper.component';

describe('PageHeaderWrapperComponent', () => {
  let component: PageHeaderWrapperComponent;
  let fixture: ComponentFixture<PageHeaderWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHeaderWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHeaderWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

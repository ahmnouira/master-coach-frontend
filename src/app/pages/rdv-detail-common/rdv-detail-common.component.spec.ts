import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvDetailCommonComponent } from './rdv-detail-common.component';

describe('RdvDetailCommonComponent', () => {
  let component: RdvDetailCommonComponent;
  let fixture: ComponentFixture<RdvDetailCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RdvDetailCommonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvDetailCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

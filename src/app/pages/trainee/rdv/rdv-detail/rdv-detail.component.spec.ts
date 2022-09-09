import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvDetailComponent } from './rdv-detail.component';

describe('RdvDetailComponent', () => {
  let component: RdvDetailComponent;
  let fixture: ComponentFixture<RdvDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RdvDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

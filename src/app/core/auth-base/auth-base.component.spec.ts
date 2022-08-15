import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBaseComponent } from './auth-base.component';

describe('AuthBaseComponent', () => {
  let component: AuthBaseComponent;
  let fixture: ComponentFixture<AuthBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

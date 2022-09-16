import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationFormComponent } from './invitation-form.component';

describe('InvitationFormComponent', () => {
  let component: InvitationFormComponent;
  let fixture: ComponentFixture<InvitationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

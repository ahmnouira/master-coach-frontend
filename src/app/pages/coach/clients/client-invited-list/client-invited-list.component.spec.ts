import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInvitedListComponent } from './client-invited-list.component';

describe('ClientInvitedListComponent', () => {
  let component: ClientInvitedListComponent;
  let fixture: ComponentFixture<ClientInvitedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientInvitedListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientInvitedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

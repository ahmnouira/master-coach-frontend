import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAdminComponent } from './profil-admin.component';

describe('ProfilAdminComponent', () => {
  let component: ProfilAdminComponent;
  let fixture: ComponentFixture<ProfilAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

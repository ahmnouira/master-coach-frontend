import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilCoachComponent } from './profil-coach.component';

describe('ProfilCoachComponent', () => {
  let component: ProfilCoachComponent;
  let fixture: ComponentFixture<ProfilCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

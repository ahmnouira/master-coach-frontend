import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardEditComponent } from './client-card-edit.component';

describe('ClientCardEditComponent', () => {
  let component: ClientCardEditComponent;
  let fixture: ComponentFixture<ClientCardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCardEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

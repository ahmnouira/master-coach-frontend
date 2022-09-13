import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardViewFormComponent } from './client-card-view-form.component';

describe('ClientCardViewFormComponent', () => {
  let component: ClientCardViewFormComponent;
  let fixture: ComponentFixture<ClientCardViewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCardViewFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCardViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

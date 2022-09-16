import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardViewComponent } from './client-card-view.component';

describe('ClientCardViewComponent', () => {
  let component: ClientCardViewComponent;
  let fixture: ComponentFixture<ClientCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientCardViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

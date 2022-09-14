import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardToolsComponent } from './client-card-tools.component';

describe('ClientCardToolsComponent', () => {
  let component: ClientCardToolsComponent;
  let fixture: ComponentFixture<ClientCardToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientCardToolsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientCardToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardViewEmptyComponent } from './client-card-view-empty.component';

describe('ClientCardViewEmptyComponent', () => {
  let component: ClientCardViewEmptyComponent;
  let fixture: ComponentFixture<ClientCardViewEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCardViewEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCardViewEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

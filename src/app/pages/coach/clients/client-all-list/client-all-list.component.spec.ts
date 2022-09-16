import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAllListComponent } from './client-all-list.component';

describe('ClientAllListComponent', () => {
  let component: ClientAllListComponent;
  let fixture: ComponentFixture<ClientAllListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAllListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

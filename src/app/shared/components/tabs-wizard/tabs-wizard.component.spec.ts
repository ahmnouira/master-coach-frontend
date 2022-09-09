import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsWizardComponent } from './tabs-wizard.component';

describe('TabsWizardComponent', () => {
  let component: TabsWizardComponent;
  let fixture: ComponentFixture<TabsWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabsWizardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

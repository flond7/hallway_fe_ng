import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegGoalTabComponent } from './peg-goal-tab.component';

describe('PegGoalTabComponent', () => {
  let component: PegGoalTabComponent;
  let fixture: ComponentFixture<PegGoalTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegGoalTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegGoalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

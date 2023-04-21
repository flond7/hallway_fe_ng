import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegGoalPhaseComponent } from './peg-goal-phase.component';

describe('PegGoalPhaseComponent', () => {
  let component: PegGoalPhaseComponent;
  let fixture: ComponentFixture<PegGoalPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegGoalPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegGoalPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

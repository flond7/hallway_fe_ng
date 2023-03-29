import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegNewGoalComponent } from './peg-new-goal.component';

describe('PegNewGoalComponent', () => {
  let component: PegNewGoalComponent;
  let fixture: ComponentFixture<PegNewGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegNewGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegNewGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

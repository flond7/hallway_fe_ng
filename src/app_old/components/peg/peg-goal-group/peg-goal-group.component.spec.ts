import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegGoalGroupComponent } from './peg-goal-group.component';

describe('PegGoalGroupComponent', () => {
  let component: PegGoalGroupComponent;
  let fixture: ComponentFixture<PegGoalGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegGoalGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegGoalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

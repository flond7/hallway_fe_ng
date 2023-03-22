import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegGoalViewComponent } from './peg-goal-view.component';

describe('PegGoalViewComponent', () => {
  let component: PegGoalViewComponent;
  let fixture: ComponentFixture<PegGoalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegGoalViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegGoalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

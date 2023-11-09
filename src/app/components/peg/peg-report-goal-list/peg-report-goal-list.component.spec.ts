import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegReportGoalListComponent } from './peg-report-goal-list.component';

describe('PegReportGoalListComponent', () => {
  let component: PegReportGoalListComponent;
  let fixture: ComponentFixture<PegReportGoalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PegReportGoalListComponent]
    });
    fixture = TestBed.createComponent(PegReportGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

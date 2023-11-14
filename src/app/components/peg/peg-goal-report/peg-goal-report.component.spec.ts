import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegGoalReportComponent } from './peg-goal-report.component';

describe('PegGoalReportComponent', () => {
  let component: PegGoalReportComponent;
  let fixture: ComponentFixture<PegGoalReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PegGoalReportComponent]
    });
    fixture = TestBed.createComponent(PegGoalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

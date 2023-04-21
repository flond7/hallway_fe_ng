import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegGoalMarkerComponent } from './peg-goal-marker.component';

describe('PegGoalMarkerComponent', () => {
  let component: PegGoalMarkerComponent;
  let fixture: ComponentFixture<PegGoalMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegGoalMarkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegGoalMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

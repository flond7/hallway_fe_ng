import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegViewGoalComponent } from './peg-view-goal.component';

describe('PegViewGoalComponent', () => {
  let component: PegViewGoalComponent;
  let fixture: ComponentFixture<PegViewGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegViewGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegViewGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

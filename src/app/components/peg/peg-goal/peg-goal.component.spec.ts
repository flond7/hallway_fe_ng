import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegGoalComponent } from './peg-goal.component';

describe('PegGoalComponent', () => {
  let component: PegGoalComponent;
  let fixture: ComponentFixture<PegGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

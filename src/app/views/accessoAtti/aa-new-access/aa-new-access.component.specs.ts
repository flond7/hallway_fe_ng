import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AaNewAccessComponent } from './aa-new-access.component';

describe('PegNewGoalComponent', () => {
  let component: AaNewAccessComponent;
  let fixture: ComponentFixture<AaNewAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AaNewAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AaNewAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegPhaseRowComponent } from './peg-phase-row.component';

describe('PegPhaseRowComponent', () => {
  let component: PegPhaseRowComponent;
  let fixture: ComponentFixture<PegPhaseRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegPhaseRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegPhaseRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

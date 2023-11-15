import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegInstructionsComponent } from './peg-instructions.component';

describe('PegInstructionsComponent', () => {
  let component: PegInstructionsComponent;
  let fixture: ComponentFixture<PegInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PegInstructionsComponent]
    });
    fixture = TestBed.createComponent(PegInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

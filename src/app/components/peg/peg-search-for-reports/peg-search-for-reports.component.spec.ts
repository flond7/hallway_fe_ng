import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegSearchForReportsComponent } from './peg-search-for-reports.component';

describe('PegSearchForReportsComponent', () => {
  let component: PegSearchForReportsComponent;
  let fixture: ComponentFixture<PegSearchForReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PegSearchForReportsComponent]
    });
    fixture = TestBed.createComponent(PegSearchForReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

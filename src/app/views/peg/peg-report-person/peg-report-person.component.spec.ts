import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegReportPersonComponent } from './peg-report-person.component';

describe('PegReportPersonComponent', () => {
  let component: PegReportPersonComponent;
  let fixture: ComponentFixture<PegReportPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PegReportPersonComponent]
    });
    fixture = TestBed.createComponent(PegReportPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

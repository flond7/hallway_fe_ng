import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegReportOfficeComponent } from './peg-report-office.component';

describe('PegReportOfficeComponent', () => {
  let component: PegReportOfficeComponent;
  let fixture: ComponentFixture<PegReportOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PegReportOfficeComponent]
    });
    fixture = TestBed.createComponent(PegReportOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

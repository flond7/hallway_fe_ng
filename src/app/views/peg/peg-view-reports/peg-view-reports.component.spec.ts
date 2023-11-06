import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegViewReportsComponent } from './peg-view-reports.component';

describe('PegViewReportsComponent', () => {
  let component: PegViewReportsComponent;
  let fixture: ComponentFixture<PegViewReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegViewReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegViewReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

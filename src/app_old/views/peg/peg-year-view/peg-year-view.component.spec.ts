import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegYearViewComponent } from './peg-year-view.component';

describe('PegYearViewComponent', () => {
  let component: PegYearViewComponent;
  let fixture: ComponentFixture<PegYearViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegYearViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegYearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

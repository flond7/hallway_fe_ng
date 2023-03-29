import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegViewYearComponent } from './peg-view-year.component';

describe('PegViewYearComponent', () => {
  let component: PegViewYearComponent;
  let fixture: ComponentFixture<PegViewYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegViewYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegViewYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

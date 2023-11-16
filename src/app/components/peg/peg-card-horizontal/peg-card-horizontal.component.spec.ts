import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegCardHorizontalComponent } from './peg-card-horizontal.component';

describe('PegCardHorizontalComponent', () => {
  let component: PegCardHorizontalComponent;
  let fixture: ComponentFixture<PegCardHorizontalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PegCardHorizontalComponent]
    });
    fixture = TestBed.createComponent(PegCardHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegUserCardComponent } from './peg-user-card.component';

describe('PegUserCardComponent', () => {
  let component: PegUserCardComponent;
  let fixture: ComponentFixture<PegUserCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PegUserCardComponent]
    });
    fixture = TestBed.createComponent(PegUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

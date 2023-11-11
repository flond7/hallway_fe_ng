import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegCardComponent } from './peg-card.component';

describe('PegCardComponent', () => {
  let component: PegCardComponent;
  let fixture: ComponentFixture<PegCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

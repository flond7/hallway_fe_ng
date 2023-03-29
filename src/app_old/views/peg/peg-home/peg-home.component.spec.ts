import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegHomeComponent } from './peg-home.component';

describe('PegHomeComponent', () => {
  let component: PegHomeComponent;
  let fixture: ComponentFixture<PegHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegEditComponent } from './peg-edit.component';

describe('PegEditComponent', () => {
  let component: PegEditComponent;
  let fixture: ComponentFixture<PegEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PegEditComponent]
    });
    fixture = TestBed.createComponent(PegEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

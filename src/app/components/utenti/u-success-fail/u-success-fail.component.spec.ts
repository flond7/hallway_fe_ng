import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USuccessFailComponent } from './u-success-fail.component';

describe('USuccessFailComponent', () => {
  let component: USuccessFailComponent;
  let fixture: ComponentFixture<USuccessFailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [USuccessFailComponent]
    });
    fixture = TestBed.createComponent(USuccessFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

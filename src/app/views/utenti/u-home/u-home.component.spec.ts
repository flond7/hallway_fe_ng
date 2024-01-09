import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UHomeComponent } from './u-home.component';

describe('UHomeComponent', () => {
  let component: UHomeComponent;
  let fixture: ComponentFixture<UHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UHomeComponent]
    });
    fixture = TestBed.createComponent(UHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

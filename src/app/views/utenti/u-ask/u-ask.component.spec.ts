import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UAskComponent } from './u-ask.component';

describe('UAskComponent', () => {
  let component: UAskComponent;
  let fixture: ComponentFixture<UAskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UAskComponent]
    });
    fixture = TestBed.createComponent(UAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

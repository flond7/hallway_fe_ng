import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UListComponent } from './u-list.component';

describe('UListComponent', () => {
  let component: UListComponent;
  let fixture: ComponentFixture<UListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UListComponent]
    });
    fixture = TestBed.createComponent(UListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiHomeComponent } from './utenti-home.component';

describe('UtentiHomeComponent', () => {
  let component: UtentiHomeComponent;
  let fixture: ComponentFixture<UtentiHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtentiHomeComponent]
    });
    fixture = TestBed.createComponent(UtentiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

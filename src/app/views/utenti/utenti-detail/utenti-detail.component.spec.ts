import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiDetailComponent } from './utenti-detail.component';

describe('UtentiDetailComponent', () => {
  let component: UtentiDetailComponent;
  let fixture: ComponentFixture<UtentiDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtentiDetailComponent]
    });
    fixture = TestBed.createComponent(UtentiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

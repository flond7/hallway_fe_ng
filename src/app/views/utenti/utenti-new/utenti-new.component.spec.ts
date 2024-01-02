import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiNewComponent } from './utenti-new.component';

describe('UtentiNewComponent', () => {
  let component: UtentiNewComponent;
  let fixture: ComponentFixture<UtentiNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtentiNewComponent]
    });
    fixture = TestBed.createComponent(UtentiNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegViewUserComponent } from './peg-view-user.component';

describe('PegViewUserComponent', () => {
  let component: PegViewUserComponent;
  let fixture: ComponentFixture<PegViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegViewUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

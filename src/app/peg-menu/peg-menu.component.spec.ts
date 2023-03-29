import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegMenuComponent } from './peg-menu.component';

describe('PegMenuComponent', () => {
  let component: PegMenuComponent;
  let fixture: ComponentFixture<PegMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

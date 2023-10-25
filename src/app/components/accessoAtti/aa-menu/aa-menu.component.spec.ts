import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AaMenuComponent } from './aa-menu.component';

describe('AaMenuComponent', () => {
  let component: AaMenuComponent;
  let fixture: ComponentFixture<AaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AaMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AaListAccessComponent } from './aa-list-access.component';

describe('AaListAccessComponent', () => {
  let component: AaListAccessComponent;
  let fixture: ComponentFixture<AaListAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AaListAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AaListAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegUserViewComponent } from './peg-user-view.component';

describe('PegUserViewComponent', () => {
  let component: PegUserViewComponent;
  let fixture: ComponentFixture<PegUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PegUserViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PegUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AaDeleteModalComponent } from './aa-delete-modal.component';

describe('AaDeleteModalComponent', () => {
  let component: AaDeleteModalComponent;
  let fixture: ComponentFixture<AaDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AaDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AaDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AaListRowComponent } from './aa-list-row.component';

describe('AaListRowComponent', () => {
  let component: AaListRowComponent;
  let fixture: ComponentFixture<AaListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AaListRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AaListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

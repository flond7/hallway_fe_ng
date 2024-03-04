import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CListComponent } from './c-list.component';

describe('CListComponent', () => {
  let component: CListComponent;
  let fixture: ComponentFixture<CListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CListComponent]
    });
    fixture = TestBed.createComponent(CListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CQuestionnaireComponent } from './c-questionnaire.component';

describe('CQuestionnaireComponent', () => {
  let component: CQuestionnaireComponent;
  let fixture: ComponentFixture<CQuestionnaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CQuestionnaireComponent]
    });
    fixture = TestBed.createComponent(CQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

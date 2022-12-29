import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsListEditorComponent } from './questions-list-editor.component';

describe('QuestionsListEditorComponent', () => {
  let component: QuestionsListEditorComponent;
  let fixture: ComponentFixture<QuestionsListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsListEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

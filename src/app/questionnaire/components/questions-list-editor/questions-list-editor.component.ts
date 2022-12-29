import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Question, QuestionnaireQuestion} from "@HttpApi/model";
import QuestionHttpService from "@HttpApi/question-http.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorResponse} from "@angular/common/http";
import {SortableEvent, SortableOptions} from "sortablejs";

@Component({
  selector: 'app-questions-list-editor',
  templateUrl: './questions-list-editor.component.html',
  styleUrls: ['./questions-list-editor.component.scss']
})
export class QuestionsListEditorComponent implements OnInit {

  @ViewChild('questionsSelectorModal') public questionsSelectorModal: ElementRef<NgbModal>;
  @Input() public questionnaireQuestions: QuestionnaireQuestion[];

  public loader: boolean = false;
  public questionsAvailable: Question[] = [];
  public sortableJsOptions: SortableOptions = {
    onUpdate: (event: SortableEvent) => {
      this.updatePositionValues();
    }
  };

  public constructor(
    private questionHttpService: QuestionHttpService,
    private modalService: NgbModal
  ) { }

  public ngOnInit(): void {

  }

  public selectQuestions(): void {
    this.modalService.open(this.questionsSelectorModal, {
      centered: true
    });
    // TODO: Filter by topic (REST)
    this.loader = true;
    this.questionHttpService.findAll().subscribe({
      next: (response: Question[]) => {
        this.questionsAvailable = response;
        this.loader = false;
      },
      error: (error: HttpErrorResponse) => {
        // TODO: Handle
      }
    });
  }

  public select(question: Question): void {
    this.questionnaireQuestions.push({
      question,
      position: this.questionnaireQuestions.length
    });
  }

  public trackByQuestionnaireQuestions(index: number, questionnaireQuestion: QuestionnaireQuestion): string {
    return questionnaireQuestion.question.id as string;
  }

  private updatePositionValues(): void {
    this.questionnaireQuestions.forEach((questionnaireQuestion: QuestionnaireQuestion, index: number) => {
      questionnaireQuestion.position = index;
    });
  }
}

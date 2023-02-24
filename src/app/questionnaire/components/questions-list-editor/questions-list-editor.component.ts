import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Question, QuestionnaireQuestion, Topic} from "@HttpApi/model";
import QuestionHttpService from "@HttpApi/question-http.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-questions-list-editor',
  templateUrl: './questions-list-editor.component.html',
  styleUrls: ['./questions-list-editor.component.scss']
})
export class QuestionsListEditorComponent implements OnInit {

  @ViewChild('questionsSelectorModal') public questionsSelectorModal: ElementRef<NgbModal>;
  @Input() public questionnaireQuestions: QuestionnaireQuestion[];
  @Input() public topic: Topic;

  public loader: boolean = false;
  public questionsAvailable: Question[] = [];

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
    this.questionHttpService.findAllByTopic(this.topic).subscribe({
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
      position: this.questionnaireQuestions.length+1
    });
  }

  public trackByQuestionnaireQuestions(index: number, questionnaireQuestion: QuestionnaireQuestion): string {
    return questionnaireQuestion.question.id as string;
  }

  private updatePositionValues(): void {
    this.questionnaireQuestions.forEach((questionnaireQuestion: QuestionnaireQuestion, index: number) => {
      questionnaireQuestion.position = ++index;
    });
  }
}

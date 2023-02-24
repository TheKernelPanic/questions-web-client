import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Questionnaire, QuestionnaireQuestion, Topic} from "@HttpApi/model";
import QuestionnaireHttpService from "@HttpApi/questionnaire-http.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-questionnaire-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public formGroup: UntypedFormGroup = new UntypedFormGroup({
    'title': new UntypedFormControl('', Validators.required)
  });
  public topicSelected: Topic|null = null;
  public questionnaireQuestions: QuestionnaireQuestion[] = [];
  public loader: boolean = false;

  public constructor(
    private questionnaireHttpService: QuestionnaireHttpService,
    private router: Router
  ) {}

  public ngOnInit(): void {

  }

  public submit(): void {

    if (!this.formGroup.valid) {
      // TODO: Handle
      return;
    }
    if (this.topicSelected === null) {
      // TODO: Handle
      return;
    }

    this.loader = true;
    this.questionnaireHttpService.create(
      this.getHttpModel()
    ).subscribe({
      next: () => {
        this.router.navigate(['/questionnaire/list']).then();
      },
      error: (error: HttpErrorResponse) => {
        // TODO: Handle
      }
    });
  }

  private getHttpModel(): Questionnaire {
    return {
      title: this.formGroup.get('title')?.value,
      questions: this.questionnaireQuestions,
      topic: this.topicSelected as Topic,
      enabled: true
    }
  }

}

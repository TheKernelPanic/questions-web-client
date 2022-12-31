import { Component, OnInit } from '@angular/core';
import {Question} from "@HttpApi/model";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import QuestionHttpService from "@HttpApi/question-http.service";

@Component({
  selector: 'app-question-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public question: Question;
  public loader: boolean;

  public constructor(
    private questionHttpService: QuestionHttpService,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {
    this.loader = true;
  }

  public ngOnInit(): void {
    const questionId = this.activatedRoute.snapshot.params['questionId'];

    this.questionHttpService.find(questionId).subscribe({
      next: (response: Question) => {
        this.question = response
        this.title.setTitle(this.question.title);
        this.loader = false;
      },
      error: (error: HttpErrorResponse) => {
        // TODO: Handle
        console.log(error);
      }
    });
  }
}

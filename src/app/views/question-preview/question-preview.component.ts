import { Component, OnInit } from '@angular/core';
import {FinderService} from "../../http-services/question/finder.service";
import {Question} from "../../domain/interfaces";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss']
})
export class QuestionPreviewComponent implements OnInit {


  public question: Question;
  public loader: boolean;

  public constructor(
    private finderService: FinderService,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {
    this.loader = true;
  }

  public ngOnInit(): void {
    const questionId = this.activatedRoute.snapshot.params['questionId'];

    this.finderService.request(questionId).subscribe({
      next: (response: Question) => {
        this.question = response
        this.title.setTitle(this.question.title);
        this.loader = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }
}

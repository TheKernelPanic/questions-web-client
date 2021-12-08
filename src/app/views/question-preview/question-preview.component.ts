import { Component, OnInit } from '@angular/core';
import {FinderService} from "../../http-services/question/finder.service";
import {Question} from "../../domain/interfaces";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

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
    private activatedRoute: ActivatedRoute
  ) {
    this.loader = true;
  }

  public ngOnInit(): void {
    const questionId = this.activatedRoute.snapshot.params['questionId'];

    this.finderService.request(questionId).subscribe({
      next: (response: Question) => {
        this.question = response
        this.loader = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {Question} from "@HttpApi/model";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import QuestionHttpService from "@HttpApi/question-http.service";

@Component({
  selector: 'app-questions-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public loader: boolean;
  public questions: Question[];

  public constructor(
    private questionHttpService: QuestionHttpService,
    private router: Router,
    private title: Title
  ) {
    this.questions = [];
    this.loader = true;
  }

  public ngOnInit(): void {
    this.title.setTitle('Backoffice - Questions')
    this.questionHttpService.findAll().subscribe({
      next: (questions: Question[]) => {
        this.questions = questions;
      },
      error: (error: HttpErrorResponse) => {
        throw new Error(error.message);
      },
      complete: () => this.loader = false
    });
  }

  public async viewQuestion(question: Question): Promise<void> {
    await this.router.navigate(['/question/detail', question.id])
  }
}

import { Component, OnInit } from '@angular/core';
import {Question, Topic} from "@HttpApi/model";
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

  public loader: boolean = false;
  public questions: Question[] = [];

  public constructor(
    private questionHttpService: QuestionHttpService,
    private router: Router,
    private title: Title
  ) {
  }

  public ngOnInit(): void {
    //this.title.setTitle('Questions');
  }

  public fetchQuestions(topic: Topic): void {
    this.loader = true;
    this.questionHttpService.findAllByTopic(topic).subscribe({
      next: (questions: Question[]) => {
        this.questions = questions;
        this.loader = false;
      },
      error: (error: HttpErrorResponse) => {
        throw new Error(error.message);
      }
    });
  }

  public async viewQuestion(question: Question): Promise<void> {
    await this.router.navigate(['/question/detail', question.id])
  }
}

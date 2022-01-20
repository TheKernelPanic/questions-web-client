import { Component, OnInit } from '@angular/core';
import {Question} from "../../domain/interfaces";
import {FindAllService} from "../../http-services/question/find-all.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {

  public loader: boolean;
  public questions: Question[];

  public constructor(
    private findAllService: FindAllService,
    private router: Router,
    private title: Title
  ) {
    this.questions = [];
    this.loader = true;
  }

  public ngOnInit(): void {
    this.title.setTitle('Backoffice - Questions')
    this.findAllService.request().subscribe({
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
    await this.router.navigate(['/question-preview', question.id])
  }
}

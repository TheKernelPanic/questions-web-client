import { Component, OnInit } from '@angular/core';
import {Language, Question} from "../../domain/interfaces";
import {GetAllService} from "../../http-services/language/get-all.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: []
})
export class NewQuestionComponent implements OnInit {

  public maxAmountAnswers: number = 5;
  public loader: boolean = false;
  public question: Question = {
    translations: [],
    answers: []
  };
  public languagesAvailable: Language[] = [];
  public languageSelected: Language;

  public constructor(
    private languageHttpService: GetAllService
  ) { }

  public ngOnInit(): void {

      this.languageHttpService.request().then(
        (response: Language[]) => {
          this.languagesAvailable = response;
          this.languageSelected = this.languagesAvailable[0];
          this.addDefaultQuestionTranslation();
          this.loader = false;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  public addNewAnswer(): void {
    if (this.question.answers.length >= this.maxAmountAnswers) return;
    this.question.answers.push({
      translations: [
        {
          text: '',
          language: this.languageSelected as Language
        }
      ],
      position: this.question.answers.length + 1,
      result: false
    });
  }

  private addDefaultQuestionTranslation(): void {
    this.languagesAvailable.forEach((language: Language) => {
      this.question.translations.push({
        title: '',
        language
      });
    });
  }

  public removeAnswer(event: Event, index: number): void {
    event.preventDefault();
    this.question.answers.splice(index, 1);
  }
}

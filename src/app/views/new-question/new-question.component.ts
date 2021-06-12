import { Component, OnInit } from '@angular/core';
import {Language, Question} from "../../domain/interfaces";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: []
})
export class NewQuestionComponent implements OnInit {

  public question: Question = {
    translations: [],
    answers: []
  };
  public languagesAvailable: Language[] = [];

  public constructor() { }

  public ngOnInit(): void {

  }
}

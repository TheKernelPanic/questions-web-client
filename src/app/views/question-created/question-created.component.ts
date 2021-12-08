import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-question-created',
  templateUrl: './question-created.component.html',
  styleUrls: ['./question-created.component.scss']
})
export class QuestionCreatedComponent implements OnInit {

  public constructor(
    private title: Title
  ) { }

  public ngOnInit(): void {
    this.title.setTitle('Question created successfully');
  }
}

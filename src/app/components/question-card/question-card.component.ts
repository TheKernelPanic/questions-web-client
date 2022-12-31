import {Component, Input, OnInit} from '@angular/core';
import {Question} from "@HttpApi/model";

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() public question: Question;

  public ngOnInit(): void {
  }
}

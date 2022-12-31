import { Component, OnInit } from '@angular/core';
import HelpHttpService from "@HttpApi/help-http.service";
import {Help, Topic} from "@HttpApi/model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-help-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public loader: boolean = false;
  public topicSelected: Topic;
  public helps: Help[] = [];

  public constructor(
    private helpHttpService: HelpHttpService
  ) { }

  public ngOnInit(): void {
  }

  public onTopicSelection(topic: Topic): void {
    this.topicSelected = topic;
    this.loader = true;
    this.helpHttpService.findAllByTopic(topic).subscribe({
      next: (response: Help[]) => {
        this.helps = response;
        console.log(this.helps);
        this.loader = false;
      },
      error: (error: HttpErrorResponse) => {
        // TODO: Handle
      }
    });
  }
}

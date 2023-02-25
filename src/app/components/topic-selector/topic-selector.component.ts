import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Topic} from "@HttpApi/model";
import {HttpErrorResponse} from "@angular/common/http";
import TopicHttpService from "@HttpApi/topic-http.service";
import {from} from "rxjs";

@Component({
  selector: 'app-topic-selector',
  templateUrl: './topic-selector.component.html'
})
export class TopicSelectorComponent implements OnInit {

  @Output() public onTopicSelection: EventEmitter<Topic> = new EventEmitter<Topic>();

  public topics: Topic[] = [];
  public loader: boolean = false;
  public topicSelected: Topic;

  public constructor(
    private topicHttpService: TopicHttpService
  ) {
  }

  public ngOnInit(): void {
    this.loader = true;
    this.topicHttpService.findAll().subscribe({
      next: (response: Topic[]) => {
        this.topics = response;
        if (this.topics.length) {
          this.topicSelected = this.topics[0];
          this.onChangeTopic();
        }
      },
      error: (error: HttpErrorResponse) => {
        // TODO: Handle
      },
      complete: () => {
        this.loader = false;
      }
    });
  }

  public onChangeTopic(): void {
    this.onTopicSelection.emit(this.topicSelected);
  }
}

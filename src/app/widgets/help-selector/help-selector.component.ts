import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FindByTopicService} from "../../http-services/help/find-by-topic.service";
import {Help, Topic} from "../../domain/interfaces";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-help-selector',
  templateUrl: './help-selector.component.html'
})
export class HelpSelectorComponent {

  @ViewChild('helpSelectorModal') private helpSelectorModal: ElementRef<NgbModalRef>;
  @Output() public onSelectHelp: EventEmitter<Help>;
  @Input() public topic: Topic;

  public helps: Help[];
  public loader: boolean;

  public constructor(
    private findByTopicService: FindByTopicService,
    private modalService: NgbModal
  ) {
    this.helps = [];
    this.loader = false;
    this.onSelectHelp = new EventEmitter<Help>();
  }

  public fetchHttp(): void {
    this.loader = true;
    this.findByTopicService.request(this.topic).subscribe({
      next: (response: Help[]) => {
        this.helps = response;
        this.loader = false;
      },
      error: (error: HttpErrorResponse) => {
        /**
         * TODO: Handle
         */
        throw new Error(error.message);
      }
    });
  }

  public select(help: Help): void {
    this.onSelectHelp.emit(help);
  }

  public openModal(): void {
    this.modalService.open(this.helpSelectorModal, {
      centered: true
    });
    this.fetchHttp();
  }
}

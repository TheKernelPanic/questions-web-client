import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Help, Topic} from "@HttpApi/model";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import HelpHttpService from "@HttpApi/help-http.service";

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
    private helpHttpService: HelpHttpService,
    private modalService: NgbModal
  ) {
    this.helps = [];
    this.loader = false;
    this.onSelectHelp = new EventEmitter<Help>();
  }

  public fetchHttp(): void {
    this.loader = true;
    this.helpHttpService.findAllByTopic(this.topic).subscribe({
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

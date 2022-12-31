import {Component, Input, OnInit} from '@angular/core';
import {Help} from "@HttpApi/model";

@Component({
  selector: 'app-help-card',
  templateUrl: './help-card.component.html',
  styleUrls: ['./help-card.component.scss']
})
export class HelpCardComponent implements OnInit {

  @Input() public help: Help;

  public ngOnInit(): void {
  }
}

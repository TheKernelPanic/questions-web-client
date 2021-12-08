import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  public code: number;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {}

  public ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['code'];
    this.title.setTitle('ERROR ' + this.code);
  }
}

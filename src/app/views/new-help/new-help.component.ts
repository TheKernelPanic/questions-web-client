import { Component, OnInit } from '@angular/core';
import {NewHelpService} from "../../http-services/help/new-help.service";
import {Book, Help, Lesson, Topic} from "../../domain/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-help',
  templateUrl: './new-help.component.html',
  styleUrls: ['./new-help.component.scss']
})
export class NewHelpComponent implements OnInit {

  public loader: boolean;
  public mimetypesAllowed: string[];
  public form: FormGroup;
  public topicSelected: Topic|null;
  public bookSelected: Book|null;
  public lessonSelected: Lesson|null;
  public formHasErrors: boolean;

  public constructor(
    private newHelpService: NewHelpService,
    private titleService: Title,
    private router: Router
  ) {
    this.mimetypesAllowed = [
      'text/markdown',
      'text/plain',
      'text/html'
    ];
    this.topicSelected = null;
    this.bookSelected = null;
    this.lessonSelected = null;
    this.formHasErrors = false;
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Backoffice - New help');
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      mimetype: new FormControl(this.mimetypesAllowed[0], Validators.required)
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.formHasErrors = true;
      return;
    }
    this.loader = true;
    this.newHelpService.request(this.getHttpModel()).subscribe({
      next: async () => {
        await this.router.navigate(['/']);
      },
      error: async (error: HttpErrorResponse) => {
        await this.router.navigate(['/error', error.status]);
      }
    })
  }

  private getHttpModel(): Help {
    return {
      title: (this.form.get('title') as FormControl).value,
      content: (this.form.get('content') as FormControl).value,
      mimetype: (this.form.get('mimetype') as FormControl).value,
      topic: this.topicSelected,
      book: this.bookSelected,
      lesson: this.lessonSelected
    }
  }
}

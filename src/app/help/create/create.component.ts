import { Component, OnInit } from '@angular/core';
import {Book, Help, Lesson, Topic} from "@HttpApi/model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import HelpHttpService from "@HttpApi/help-http.service";

@Component({
  selector: 'app-help-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public loader: boolean = false;
  public mimetypesAllowed: string[] = [
    'text/markdown',
    'text/plain',
    'text/html'
  ];
  public form: FormGroup;
  public topicSelected: Topic|null = null;
  public bookSelected: Book|null = null;
  public lessonSelected: Lesson|null = null;

  public constructor(
    private helpHttpService: HelpHttpService,
    private titleService: Title,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    //this.titleService.setTitle('Backoffice - New help');
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      mimetype: new FormControl(this.mimetypesAllowed[0], Validators.required)
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loader = true;
    this.helpHttpService.create(this.getHttpModel()).subscribe({
      next: async () => {
        this.router.navigate(['/help/list']).then();
      },
      error: (error: HttpErrorResponse) => {
        // TODO: Handle
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

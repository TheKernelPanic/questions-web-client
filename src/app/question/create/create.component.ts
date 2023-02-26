import {Component, OnInit} from '@angular/core';
import {Book, FileUploaded, Help, Lesson, Question, Tag, Topic} from "@HttpApi/model";
import {
  AbstractControl,
  FormControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import QuestionHttpService from "@HttpApi/question-http.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-question-create',
  templateUrl: './create.component.html',
  styleUrls: []
})
export class CreateComponent implements OnInit {

  public form: UntypedFormGroup;
  public maxAmountAnswers: number = 6;
  public loader: boolean = false;
  public helps: Help[];
  public tags: Tag[];
  public topicSelected: Topic|null = null;
  public topicSelectionSubject: Subject<Topic> = new Subject<Topic>();
  public bookSelected: Book|null = null;
  public bookSelectionSubject: Subject<Book> = new Subject<Book>();
  public lessonSelected: Lesson|null = null;
  public image: FileUploaded|null = null;
  public mimetypeSelected: string;

  public constructor(
    private formBuilder: UntypedFormBuilder,
    private title: Title,
    private questionHttpService: QuestionHttpService,
    private router: Router
  ) {
    this.loader = false;
    this.helps = [];
    this.tags = [];
  }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public addNewAnswer(): void {
    if ((this.form.get('answers') as UntypedFormArray).length >= this.maxAmountAnswers) {
      return;
    }
    (this.form.get('answers') as UntypedFormArray).push(
      new UntypedFormGroup({
        'text': new FormControl('', Validators.required),
        'result': new FormControl(false),
        'mimetype': new FormControl('', Validators.required)
      })
    );
  }

  public removeAnswer(index: number): void {
    (this.form.get('answers') as UntypedFormArray).removeAt(index);
  }

  public answers(): UntypedFormArray {
    return this.form.get('answers') as UntypedFormArray;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loader = true;
    this.questionHttpService.create(this.getHttpModel()).subscribe({
      next: () => {
        this.router.navigate(['/question-created']);
      },
      error: (error: HttpErrorResponse) => {
        throw new Error(error.message);
      }
    })
  }

  private initializeForm(): void {
    this.form = new UntypedFormGroup({
      questionTitle: new UntypedFormControl('', Validators.required),
      questionObservations: new UntypedFormControl(''),
      answers: this.formBuilder.array([])
    })
  }

  private getHttpModel(): Question {
    const question: Question = {
      title: (this.form.get('questionTitle') as UntypedFormControl).value,
      observations: (this.form.get('questionObservations') as UntypedFormControl).value.length ? (this.form.get('questionObservations') as UntypedFormControl).value : null,
      answers: [],
      image: this.image,
      mimetype: this.mimetypeSelected
    };
    for (let i = 0; i < (this.form.get('answers') as UntypedFormArray).length; i++) {
      const group: AbstractControl = (this.form.get('answers') as UntypedFormArray).at(i);
      question.answers.push({
        text: (group.get('text') as UntypedFormControl).value,
        result: (group.get('result') as UntypedFormControl).value,
        mimetype: (group.get('mimetype') as UntypedFormControl).value,
        position: i+1
      });
    }
    if (this.topicSelected !== null) {
      question.topic = this.topicSelected;
    }
    if (this.lessonSelected !== null) {
      question.lesson = this.lessonSelected;
    }
    question.helps = this.helps;
    question.tags = this.tags;

    return question;
  }

  public addHelp(help: Help): void {
    if (!this.helps.includes(help)) {
      this.helps.push(help);
    }
  }

  public onTopicSelected(topic: Topic): void {
    this.topicSelected = topic;
    this.topicSelectionSubject.next(topic);
  }

  public onBookSelected(book: Book): void {
    this.bookSelectionSubject.next(book);
    this.bookSelected = book;
  }
}

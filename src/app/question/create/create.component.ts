import {Component, OnInit} from '@angular/core';
import {Book, Help, Lesson, Question, Tag, Topic} from "@HttpApi/model";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

  public form: FormGroup;
  public maxAmountAnswers: number = 6;
  public loader: boolean = false;
  public helps: Help[];
  public tags: Tag[];

  public topicSelected: Topic|null = null;
  public topicSelectionSubject: Subject<Topic> = new Subject<Topic>();

  public bookSelected: Book|null = null;
  public bookSelectionSubject: Subject<Book> = new Subject<Book>();

  public lessonSelected: Lesson|null = null;


  public constructor(
    private formBuilder: FormBuilder,
    private title: Title,
    private questionHttpService: QuestionHttpService,
    private router: Router
  ) {
    this.loader = false;
    this.helps = [];
    this.tags = [];
  }

  public ngOnInit(): void {
    //this.title.setTitle('Backoffice - Question creation');
    this.initializeForm();
    this.addNewAnswer();
  }

  public addNewAnswer(): void {
    if ((this.form.get('answers') as FormArray).length >= this.maxAmountAnswers) {
      return;
    }
    (this.form.get('answers') as FormArray).push(
      new FormGroup({
        text: new FormControl('', Validators.required),
        result: new FormControl(false)
      })
    );
  }

  public removeAnswer(index: number): void {
    (this.form.get('answers') as FormArray).removeAt(index);
  }

  public answers(): FormArray {
    return this.form.get('answers') as FormArray;
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
    this.form = new FormGroup({
      questionTitle: new FormControl('', Validators.required),
      questionObservations: new FormControl(''),
      answers: this.formBuilder.array([])
    })
  }

  private getHttpModel(): Question {
    const question: Question = {
      title: (this.form.get('questionTitle') as FormControl).value,
      observations: (this.form.get('questionObservations') as FormControl).value.length ? (this.form.get('questionObservations') as FormControl).value : null,
      answers: []
    };
    for (let i = 0; i < (this.form.get('answers') as FormArray).length; i++) {
      const group: AbstractControl = (this.form.get('answers') as FormArray).at(i);
      question.answers.push({
        text: (group.get('text') as FormControl).value,
        result: (group.get('result') as FormControl).value,
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

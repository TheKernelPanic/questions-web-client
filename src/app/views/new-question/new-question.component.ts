import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Book, Lesson, Question, Topic} from "../../domain/interfaces";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FindAllService} from "../../http-services/topic/find-all.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FindByTopicService} from "../../http-services/book/find-by-topic.service";
import {FindByBookService} from "../../http-services/lesson/find-by-book.service";
import {Title} from "@angular/platform-browser";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewLessonService} from "../../http-services/lesson/new-lesson.service";
import {NewQuestionService} from "../../http-services/question/new-question.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: []
})
export class NewQuestionComponent implements OnInit {

  @ViewChild('newLessonModal') private newLessonModal: ElementRef<HTMLElement>;

  public form: FormGroup;
  public maxAmountAnswers: number = 5;
  public loader: boolean = false;
  public topics: Topic[];
  public books: Book[];
  public lessons: Lesson[];
  public formAsErrors: boolean;
  public lessonSelected: Lesson|null;
  public topicSelected: Topic|null;
  public bookSelected: Book|null;
  public newLessonForm: FormGroup;

  public constructor(
    private formBuilder: FormBuilder,
    private topicService: FindAllService,
    private bookService: FindByTopicService,
    private lessonService: FindByBookService,
    private title: Title,
    private modalService: NgbModal,
    private newLessonService: NewLessonService,
    private newQuestionService: NewQuestionService,
    private router: Router
  ) {
    this.loader = true;
    this.topics = [];
    this.books = [];
    this.lessons = [];
    this.formAsErrors = false;
    this.lessonSelected = null;
    this.bookSelected = null;
    this.topicSelected = null;
  }

  public topicsHttpRequest(): void {
    this.loader = true;
    this.topicService.request().subscribe({
      next: (response: Topic[]) => {
        if (response.length) {
          this.topics = response;
          this.topicSelected = this.topics[0];
          this.bookHttpService();
        }
      },
      error: (error: HttpErrorResponse) => {
        throw new Error(error.message);
      },
      complete: () => {
        this.loader = false;
      }
    })
  }

  public bookHttpService(): void {
    this.loader = true;
    this.bookService.request(this.topicSelected?.id as string).subscribe({
      next: (response: Book[]) => {
        if (response.length) {
          this.books = response;
          this.bookSelected = this.books[0];
          this.lessonHttpService();
        }
      },
      error: (error: HttpErrorResponse) => {
        throw new Error(error.message);
      },
      complete: () => {
        this.loader = false;
      }
    })
  }

  public lessonHttpService(): void {
    this.loader = true;
    this.lessonService.request(this.bookSelected?.id as string).subscribe({
      next: (response: Lesson[]) => {
        if (response.length) {
          this.lessons = response;
        }
      },
      error: (error: HttpErrorResponse) => {
        throw new Error(error.message);
      },
      complete: () => {
        this.loader = false;
      }
    })
  }

  public ngOnInit(): void {
    this.title.setTitle('Backoffice - Question creation');

    this.topicsHttpRequest();
    this.initializeForm();

    this.addNewAnswer();
    this.addNewAnswer();
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
      this.formAsErrors = true;
      return;
    }
    this.loader = true;
    this.newQuestionService.request(this.getHttpModel()).subscribe({
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
    return question;
  }

  public saveNewLesson(): void {
    if (!this.newLessonForm.valid) {
      return;
    }
    const lesson: Lesson = {
      description: (this.newLessonForm.get('description') as FormControl).value,
      position: this.lessons.length+1,
      book: this.bookSelected
    }
    this.newLessonService.request(lesson).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.lessonHttpService();
      },
      error: (error: HttpErrorResponse) => {
        throw new Error(error.message);
      }
    });
  }

  public openNewLessonModal(): void {
    this.newLessonForm = new FormGroup({
      description: new FormControl('', Validators.required)
    });
    this.modalService.open(this.newLessonModal, {});
  }
}

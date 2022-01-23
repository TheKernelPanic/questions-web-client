import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Book, Lesson, Topic} from "../../domain/interfaces";
import {FindAllService} from "../../http-services/topic/find-all.service";
import {FindByTopicService} from "../../http-services/book/find-by-topic.service";
import {FindByBookService} from "../../http-services/lesson/find-by-book.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NewLessonService} from "../../http-services/lesson/new-lesson.service";

@Component({
  selector: 'app-topic-selector',
  templateUrl: './topic-selector.component.html'
})
export class TopicSelectorComponent implements OnInit {

  @ViewChild('newLessonModal') private newLessonModal: ElementRef<NgbModalRef>;
  @Output() public selectTopic: EventEmitter<Topic|null>;
  @Output() public selectBook: EventEmitter<Book|null>;
  @Output() public selectLesson: EventEmitter<Lesson|null>;

  public topics: Topic[];
  public books: Book[];
  public lessons: Lesson[];
  public loader: boolean;
  public newLessonForm: FormGroup;
  public topicSelected: Topic|null;
  public bookSelected: Book|null;
  public lessonSelected: Lesson|null;

  public constructor(
    private topicService: FindAllService,
    private bookService: FindByTopicService,
    private lessonService: FindByBookService,
    private newLessonService: NewLessonService,
    private modalService: NgbModal,
  ) {
    this.topics = [];
    this.books = [];
    this.lessons = [];
    this.topicSelected = null;
    this.bookSelected = null;
    this.lessonSelected = null;
    this.selectTopic = new EventEmitter<Topic|null>();
    this.selectBook = new EventEmitter<Book|null>();
    this.selectLesson = new EventEmitter<Lesson|null>();
  }

  public ngOnInit(): void {
    this.loader = true;
    this.topicService.request().subscribe({
      next: (response: Topic[]) => {
        if (response.length) {
          this.topics = response;
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

  public bookHttpRequest(): void {
    this.loader = true;
    this.bookService.request(this.topicSelected?.id as string).subscribe({
      next: (response: Book[]) => {
        if (response.length) {
          this.books = response;
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

  public lessonHttpRequest(): void {
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
        this.lessonHttpRequest();
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
    this.modalService.open(this.newLessonModal, {
      centered: true
    });
  }

  public onChangeTopic(): void {
    this.selectTopic.emit(this.topicSelected);
    this.books = [];
    this.lessons = [];
    this.bookHttpRequest();
  }

  public onChangeBook(): void {
    this.selectBook.emit(this.bookSelected);
    this.lessons = [];
    this.lessonHttpRequest();
  }

  public onChangeLesson(): void {
    this.selectLesson.emit(this.lessonSelected);
  }
}

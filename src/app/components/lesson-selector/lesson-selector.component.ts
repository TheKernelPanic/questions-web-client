import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import LessonHttpService from "@HttpApi/lesson-http.service";
import {Subject} from "rxjs";
import {Book, Lesson} from "@HttpApi/model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-lesson-selector',
  templateUrl: './lesson-selector.component.html',
  styleUrls: ['./lesson-selector.component.scss']
})
export class LessonSelectorComponent implements OnInit {

  @Input() public bookSelected: Subject<Book>;
  @Output() public onLessonSelection: EventEmitter<Lesson> = new EventEmitter<Lesson>();

  public loader: boolean = false;
  public lessons: Lesson[] = [];
  public lessonSelected: Lesson;

  public constructor(
    private lessonHttpService: LessonHttpService
  ) { }

  public ngOnInit(): void {
    this.bookSelected.subscribe({
      next: (book: Book) => {
        this.loader = true;
        this.lessonHttpService.findByBook(book).subscribe({
          next: (response: Lesson[]) => {
            this.lessons = response;
            this.loader = false;
          },
          error: (error: HttpErrorResponse) => {
            // TODO: Handle
          }
        });
      }
    });
  }

  public onChangeLesson(): void {
    this.onLessonSelection.emit(this.lessonSelected);
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import BookHttpService from "@HttpApi/book-http.service";
import {Book, Topic} from "@HttpApi/model";
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";

@Component({
  selector: 'app-book-selector',
  templateUrl: './book-selector.component.html',
  styleUrls: ['./book-selector.component.scss']
})
export class BookSelectorComponent implements OnInit {

  @Input() public topicSelected: Subject<Topic>;
  @Output() public onBookSelection: EventEmitter<Book> = new EventEmitter<Book>();

  public books: Book[] = [];
  public loader: boolean = false;
  public bookSelected: Book;

  public constructor(
    private bookHttpService: BookHttpService
  ) { }

  public ngOnInit(): void {
    this.topicSelected.subscribe({
      next: (topic: Topic) => {
        this.loader = true;
        this.bookHttpService.findByTopic(topic).subscribe({
          next: (response: Book[]) => {
            this.books = response;
            this.loader = false;
          },
          error: (error: HttpErrorResponse) => {
            // TODO: Handle
          }
        });
      }
    });
  }

  public onChangeBook(): void {
    this.onBookSelection.emit(this.bookSelected);
  }
}

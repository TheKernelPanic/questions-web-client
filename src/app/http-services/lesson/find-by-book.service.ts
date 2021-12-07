import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Book, Lesson} from "../../domain/interfaces";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FindByBookService extends HttpService {
  public request(bookId: string): Observable<Lesson[]> {
    return this.httpClient.get<Lesson[]>(
      this.applicationServerHost + '/getLessonsByBook/' + bookId
    );
  }
}

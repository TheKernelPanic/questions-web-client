import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Book} from "../../domain/interfaces";

export class FindByBookService extends HttpService {
  public request(bookId: string): Observable<Book[]> {
    return this.httpClient.get(
      this.applicationServerHost + '/getLessonsByBook/' + bookId
    );
  }
}

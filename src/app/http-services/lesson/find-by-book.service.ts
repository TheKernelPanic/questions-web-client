import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Book} from "../../domain/interfaces";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FindByBookService extends HttpService {
  public request(bookId: string): Observable<Book[]> {
    return this.httpClient.get(
      this.applicationServerHost + '/getLessonsByBook/' + bookId
    );
  }
}

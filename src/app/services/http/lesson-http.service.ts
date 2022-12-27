import {BaseHttpService} from "./base-http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Lesson} from "./model";

@Injectable({
  providedIn: 'root'
})
export default class LessonHttpService extends BaseHttpService {

  public findAll(): Observable<Lesson[]> {
    return this.httpClient.get<Lesson[]>(
      this.applicationServerHost + '/getLessons'
    );
  }

  public findByBook(bookId: string): Observable<Lesson[]> {
    return this.httpClient.get<Lesson[]>(
      this.applicationServerHost + '/getLessonsByBook/' + bookId
    );
  }

  public create(lesson: Lesson): Observable<void> {
    return this.httpClient.post<void>(
      this.applicationServerHost + '/newLesson',
      lesson
    );
  }

}

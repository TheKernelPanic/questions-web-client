import {HttpService} from "../http.service";
import {Lesson} from "../../domain/interfaces";
import {Observable} from "rxjs";

export class NewLessonService extends HttpService {
  public request(lesson: Lesson): Observable<void> {
    return this.httpClient.post<void>(
      this.applicationServerHost + '/newLesson',
      lesson
    );
  }
}

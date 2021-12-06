import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Lesson} from "../../domain/interfaces";

export class FindAllService extends HttpService {
  public request(): Observable<Lesson[]> {
    return this.httpClient.get(
      this.applicationServerHost + '/getLessons'
    );
  }
}

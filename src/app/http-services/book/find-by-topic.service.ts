import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Book} from "../../domain/interfaces";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FindByTopicService extends HttpService {
  public request(topicId: string): Observable<Book[]> {
    return this.httpClient.get<Book[]>(
      this.applicationServerHost + '/getBooksByTopic/' + topicId
    );
  }
}

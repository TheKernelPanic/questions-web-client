import {BaseHttpService} from "./base-http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Book} from "./model";

@Injectable({
  providedIn: 'root'
})
export default class BookHttpService extends BaseHttpService {

  public findByTopic(topicId: string): Observable<Book[]> {
    return this.httpClient.get<Book[]>(
      this.applicationServerHost + '/getBooksByTopic/' + topicId
    );
  }

}

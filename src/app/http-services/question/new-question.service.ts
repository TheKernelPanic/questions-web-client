import {HttpService} from "../http.service";
import {Question} from "../../domain/interfaces";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NewQuestionService extends HttpService {
  public request(question: Question): Observable<void> {
    return this.httpClient.post<void>(
      this.applicationServerHost + '/newQuestion',
      question
    );
  }
}

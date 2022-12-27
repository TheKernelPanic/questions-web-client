import {BaseHttpService} from "./base-http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Question} from "./model";

@Injectable({
  providedIn: 'root'
})
export default class QuestionHttpService extends BaseHttpService {

  public findAll(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(
      this.applicationServerHost + '/getQuestions'
    );
  }

  public find(questionId: string): Observable<Question> {
    return this.httpClient.get<Question>(
      this.applicationServerHost + '/getQuestion/' + questionId
    );
  }

  public create(question: Question): Observable<void> {
    return this.httpClient.post<void>(
      this.applicationServerHost + '/newQuestion',
      question
    );
  }
}

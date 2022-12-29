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
      this.getUrl('list')
    );
  }

  public find(questionId: string): Observable<Question> {
    return this.httpClient.get<Question>(
      this.getUrl('find') + '/' + questionId
    );
  }

  public create(question: Question): Observable<void> {
    return this.httpClient.post<void>(
      this.getUrl('create'),
      question
    );
  }

  protected getUrl(uri: string): string {
    return super.getUrl('question') + '/' + uri;
  }

}

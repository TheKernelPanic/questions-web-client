import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Question} from "../../domain/interfaces";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FinderService extends HttpService {
  public request(questionId: string): Observable<Question> {
    return this.httpClient.get<Question>(
      this.applicationServerHost + '/getQuestion/' + questionId
    );
  }
}

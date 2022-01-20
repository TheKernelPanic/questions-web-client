import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Question} from "../../domain/interfaces";

@Injectable({
  providedIn: 'root'
})
export class FindAllService extends HttpService {
  public request(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(
      this.applicationServerHost + '/getQuestions'
    );
  }
}

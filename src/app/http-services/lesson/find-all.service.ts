import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Lesson} from "../../domain/interfaces";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FindAllService extends HttpService {
  public request(): Observable<Lesson[]> {
    return this.httpClient.get(
      this.applicationServerHost + '/getLessons'
    );
  }
}

import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Topic} from "../../domain/interfaces";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FindAllService extends HttpService {
  public request(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(
      this.applicationServerHost + '/getTopics'
    );
  }
}

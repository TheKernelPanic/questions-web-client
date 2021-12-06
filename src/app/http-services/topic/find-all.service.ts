import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Topic} from "../../domain/interfaces";

export class FindAllService extends HttpService {
  public request(): Observable<Topic[]> {
    return this.httpClient.get(
      this.applicationServerHost + '/getTopics'
    );
  }
}

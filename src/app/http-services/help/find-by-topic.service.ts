import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {Help, Topic} from "../../domain/interfaces";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FindByTopicService extends HttpService {
  public request(topic: Topic): Observable<Help[]> {
    return this.httpClient.get<Help[]>(
      this.applicationServerHost + '/getHelps/' + topic.id
    );
  }
}

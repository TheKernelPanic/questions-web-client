import {Help, Topic} from "./model";
import {Observable} from "rxjs";
import {BaseHttpService} from "./base-http.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export default class HelpHttpService extends BaseHttpService {

  public findAllByTopic(topic: Topic): Observable<Help[]> {
    return this.httpClient.get<Help[]>(
      this.applicationServerHost + '/getHelps/' + topic.id
    );
  }

  public create(help: Help): Observable<void> {
    return this.httpClient.post<void>(
      this.applicationServerHost + '/newHelp',
      help
    );
  }
}

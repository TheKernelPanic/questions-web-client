import {HttpService} from "../http.service";
import {Injectable} from "@angular/core";
import {Help} from "../../domain/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewHelpService extends HttpService {
  public request(help: Help): Observable<void> {
    return this.httpClient.post<void>(
      this.applicationServerHost + '/newHelp',
      help
    );
  }
}

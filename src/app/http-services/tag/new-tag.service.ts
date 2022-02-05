import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {Tag} from "../../domain/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewTagService extends HttpService {
  public request(tag: Tag): Observable<Tag> {
    return this.httpClient.post<Tag>(
      this.applicationServerHost + '/newTag',
      tag
    );
  }
}

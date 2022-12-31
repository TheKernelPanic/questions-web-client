import {BaseHttpService} from "./base-http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Book, Topic} from "./model";

@Injectable({
  providedIn: 'root'
})
export default class BookHttpService extends BaseHttpService {

  public findByTopic(topic: Topic): Observable<Book[]> {
    return this.httpClient.get<Book[]>(
      this.getUrl('list-by-topic') + '/' + topic.id
    );
  }

  protected getUrl(uri: string): string {
    return super.getUrl('book') + '/' + uri;
  }
}

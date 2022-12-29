import {BaseHttpService} from "./base-http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Topic} from "./model";

@Injectable({
  providedIn: 'root'
})
export default class TopicHttpService extends BaseHttpService {

  public findAll(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(
      this.getUrl('list')
    );
  }

  protected getUrl(uri: string): string {
    return super.getUrl('topic') + '/' + uri;
  }
}

import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {Language} from "../../domain/interfaces";

@Injectable({
  providedIn: 'root'
})
export class GetAllService extends HttpService {

  protected readonly uri: string = 'getAllLanguages';

  public request(): Promise<Language[]> {
    return this.httpClient.get<Language[]>(
      this.getUrl()
    ).toPromise();
  }
}

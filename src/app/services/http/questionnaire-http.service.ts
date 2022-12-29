import {BaseHttpService} from "@HttpApi/base-http.service";
import {Injectable} from "@angular/core";
import {Questionnaire} from "@HttpApi/model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class QuestionnaireHttpService extends BaseHttpService {

  public create(questionnaire: Questionnaire): Observable<void> {
    return this.httpClient.post<void>(
      this.getUrl('create'),
      questionnaire
    );
  }

  public getUrl(uri: string): string {
    return super.getUrl('questionnaire') + '/' + uri;
  }

}

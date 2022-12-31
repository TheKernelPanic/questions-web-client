import {BaseHttpService} from "@HttpApi/base-http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {FileUploaded} from "@HttpApi/model";

@Injectable({
  providedIn: 'root'
})
export class UploadHttpService extends BaseHttpService {


  public image(formData: FormData): Observable<FileUploaded> {
    return this.httpClient.post<FileUploaded>(
      this.getUrl('image'),
      formData
    );
  }

  protected getUrl(uri: string): string {
    return super.getUrl('upload') + '/' + uri;
  }

}

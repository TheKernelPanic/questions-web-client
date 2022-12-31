import {Inject, Pipe, PipeTransform} from '@angular/core';
import {FileUploaded} from "@HttpApi/model";

@Pipe({
  name: 'imageSourceResolver'
})
export class ImageSourceResolverPipe implements PipeTransform {

  private directoryMimetypeMap: Map<string, string> = new Map<string, string>();

  public constructor(
    @Inject('applicationServerHost') public host: string
  ) {
    this.directoryMimetypeMap.set('image/jpeg', 'images');
  }

  public transform(fileUploaded: FileUploaded|null): string {
    if (fileUploaded === null || !this.directoryMimetypeMap.has(fileUploaded.mimetype)) {
      return './assets/images/default.jpg';
    }
    return this.host + '/' + this.directoryMimetypeMap.get(fileUploaded.mimetype) + '/' + fileUploaded.filename;
  }
}

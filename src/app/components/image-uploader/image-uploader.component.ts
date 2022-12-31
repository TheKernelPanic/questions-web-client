import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {UploadHttpService} from "@HttpApi/upload-http.service";
import {FileUploaded} from "@HttpApi/model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {

  @Output() private onImageUploaded: EventEmitter<FileUploaded> = new EventEmitter<FileUploaded>();
  @ViewChild('uploader') private inputUploader: ElementRef;
  public loader: boolean = false;
  public typesAllowed: string[] = [
    'image/jpeg',
    'image/png'
  ];

  public constructor(
    private uploadHttpService: UploadHttpService
  ) { }

  public onUpload(event: Event): void {

    const files: FileList = (event.target as HTMLInputElement).files as FileList;

    if (!files.length) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('image', files[0]);

    this.uploadHttpService.image(formData).subscribe({
      next: (fileUploaded: FileUploaded) => {
        this.onImageUploaded.emit(fileUploaded);
      },
      error: (error: HttpErrorResponse) => {
        // TODO: Handle
      }
    });
  }
}

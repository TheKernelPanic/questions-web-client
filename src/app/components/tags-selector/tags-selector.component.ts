import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Tag} from "@HttpApi/model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import TagHttpService from "@HttpApi/tag-http.service";

@Component({
  selector: 'app-tags-selector',
  templateUrl: './tags-selector.component.html',
  styleUrls: ['./tags-selector.component.scss']
})
export class TagsSelectorComponent implements OnInit {

  @ViewChild('tagModal') private tagModal: ElementRef<NgbModalRef>;
  @Output() public onChangeTags: EventEmitter<Tag[]>;
  public tags: Tag[];
  public loader: boolean;
  public form: FormGroup;

  public constructor(
    private tagHttpService: TagHttpService,
    private modalService: NgbModal

  ) {
    this.tags = [];
    this.loader = false;
    this.onChangeTags = new EventEmitter<Tag[]>();
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      rawText: new FormControl({value: '', disabled: this.loader}, Validators.required)
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loader = true;
    const body: Tag = {
      raw_text: this.form.get('rawText')?.value ,
      slug: null
    };
    this.tagHttpService.create(body).subscribe({
      next: (response: Tag) => {
        this.addTag(response);
        this.form.reset();
        this.modalService.dismissAll();
        this.loader = false;
      },
      error: (error: HttpErrorResponse) => {
        throw new Error(error.message);
      }
    });
  }

  private addTag(tag: Tag): void {
    for (const element of this.tags) {
      if (element.id === tag.id) {
        return;
      }
    }
    this.tags.push(tag);
    this.onChangeTags.emit(this.tags);
  }

  public openModal(): void {
    this.modalService.open(this.tagModal, {
      centered: true
    });
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-mimetype-selector',
  templateUrl: './mimetype-selector.component.html',
  styleUrls: ['./mimetype-selector.component.scss']
})
export class MimetypeSelectorComponent implements OnInit {

  @Output() public onSelect: EventEmitter<string> = new EventEmitter();

  public mimetypesAllowed: string[] = [
    'text/plain',
    'text/html',
    'application/mathml+xml',
    'text/markdown'
  ];
  public formControl: FormControl = new FormControl();

  public ngOnInit(): void {
    this.formControl.setValue(this.mimetypesAllowed[0]);
    this.onSelect.emit(this.formControl.value);
    this.formControl.valueChanges.subscribe(() => {
      this.onSelect.emit(this.formControl.value);
    });
  }
}

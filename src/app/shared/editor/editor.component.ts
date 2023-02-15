import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { QuillConfiguration, MAX_LENGTH } from '@app/shared/editor/Quill';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {

  quillConfiguration!: any;
  @Input("controlName") controlName;
  @Input("groupName") groupName;
  @Input("value") value;
  @Input("isDetailView") isDetailView!:boolean;
  constructor() { }

  ngOnInit(): void {
    this.quillConfiguration = this.controlName ? QuillConfiguration : { toolbar: false };
  }

  textChanged($event) {
    if ($event.editor.getLength() > MAX_LENGTH) {
      $event.editor.deleteText(MAX_LENGTH, $event.editor.getLength());
    }
  }

}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { customMaterialModule } from "@app/custom-material.module";
import { ShortNamePipe } from "@app/pipe/short-name.pipe";
import { QuillModule } from "ngx-quill";

import { EditorComponent } from './editor/editor.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    ShortNamePipe,
    EditorComponent,
    ConfirmDialogComponent,
  ],
  imports:[
    customMaterialModule,
    QuillModule,
  ],
  exports:[
    customMaterialModule,
    ShortNamePipe,
    QuillModule,
    EditorComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { };
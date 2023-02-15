import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as messageActions from '@store/message/action';

export interface confirmDialogData {
  id: string
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: confirmDialogData,
    private store: Store<any>,
    ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.data.id = '';
    this.dialogRef.close();
  }

  onSubmit(id: string) {
    this.store.dispatch(messageActions.removeMessage({ id }));
    this.data.id = '';
  }
}

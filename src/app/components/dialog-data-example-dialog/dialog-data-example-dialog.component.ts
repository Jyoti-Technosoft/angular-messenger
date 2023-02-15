import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { CrudService } from '@services/crud.service';
import * as actions from '@store/message/action';

@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.component.html',
  styleUrls: ['./dialog-data-example-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogDataExampleDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public crudApi: CrudService,
    public router: Router,
    public fb: FormBuilder,
    private store: Store<any>,
  ) {}

  messageForm!: FormGroup;

  ngOnInit(): void {
    this.studenForm(this.data.message);
  }

  studenForm(data: any) {
    this.messageForm = this.fb.group({
      id: [data?.id || ''], // newly added 
      name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
      message: [data?.message || '', Validators.required],
      date: [data ? data?.date?.toDate() : new Date(), Validators.required],
    });
  }

  get messageFormControl() {
    return this.messageForm.controls;
  }

  get name() { 
    return this.messageForm.get('name'); 
  }

  get message() { 
    return this.messageForm.get('message'); 
  }

  get date() { 
    return this.messageForm.get('date'); 
  }

  getErrorMessage(key:string) {
    if (this.messageForm.controls[key].errors?.['required']) {
      return 'You must enter a value';
    } 
   
    if (this.messageForm.controls[key].errors?.['minlength']?.['actualLength'] < this.messageForm.controls[key].errors?.['minlength']?.['requiredLength']) {
      const reqlength = this.messageForm.controls[key].errors?.['minlength']?.['requiredLength']; 
      return `${key} must be at least ${reqlength} characters long.`;
    }
  
    return this.messageForm.controls[key].errors ? `Not a valid ${key}` : '';
  }


  submitMessageData() {
    if (this.messageForm?.valid) {
      if (this.data?.message) {
        const data = this.messageForm?.value;
        this.store.dispatch(actions.updateMessage({ data }));
      } else {
        this.store.dispatch(actions.addMessage(this.messageForm?.value));
      }
      this.resetForm();
      this.router.navigate(['/messages']);
    }
  }

  resetForm() {
    this.messageForm.reset();
  }

}

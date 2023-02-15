import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { message } from '@store/message/message.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private dbPath = '/message';

  messageRef: AngularFirestoreCollection<message>;
  messageDb!: Observable<any>; 

  constructor(private db: AngularFirestore,
    private _snackBar: MatSnackBar) {
    this.messageRef = db.collection(this.dbPath);
    this.messageDb = db.collection(this.dbPath).snapshotChanges();
  }

  getAll(): Observable<any> {
    return  this.messageRef.valueChanges({ idField: 'id' });
  }

  getAll2(): Observable<any> {
    return  this.messageRef.valueChanges({ idField: 'id' });
  }

  create(message:any): Observable<any>  {
    return from(this.messageRef.add({ ...message }));
  }

  update(data: any): Observable<any> {
    return from(this.messageRef.doc(data?.data?.id).update(data?.data));
  }

  delete(id: any): Observable<any> {
    return from(this.messageRef.doc(id).delete());
  }

  statusPopup(message: string, horizontalPosition:MatSnackBarHorizontalPosition = 'center', verticalPosition: MatSnackBarVerticalPosition = 'top') {
    this._snackBar.open(message, 'Dismiss', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 1500,
    });
  }
}
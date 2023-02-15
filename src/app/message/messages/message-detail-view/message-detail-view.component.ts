import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import * as messageActions from '@store/message/action';
import { message } from '@app/store/message/message.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-message-detail-view',
  templateUrl: './message-detail-view.component.html',
  styleUrls: ['./message-detail-view.component.scss'],
})
export class MessageDetailViewComponent implements OnInit, OnDestroy {
  selectedMessage$!: Observable<any>;
  selectedMessageSubscription!: Subscription;
  selectedMessage!: any;
  message$!: Observable<any>;
  messagelistSubscription!: Subscription;
  messageList!: message[];

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private location: Location,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params['params']['id'];
      this.store.dispatch(messageActions.setSelectedMessage({ id }));
    });

    this.selectedMessage$ = this.store.select(
      (state) => state.selectedMessage.selectedMessage
    );
    this.selectedMessageSubscription = this.selectedMessage$.subscribe(
      (selectedMessage) => {
        if (!selectedMessage && !this.messageList?.length) {
          this.store.dispatch(messageActions.getMessage());
          const id = this.route.snapshot.params['id'];
          this.store.dispatch(messageActions.setSelectedMessage({ id }));
        } else {
          this.selectedMessage = selectedMessage;
        }
      }
    );

    this.message$ = this.store.select((state) => state.getMessagelist);
    this.messagelistSubscription = this.message$.subscribe((data) => {
      if (data?.getMessagelist?.length) {
        this.messageList = data.getMessagelist;
        const id = this.route.snapshot.params['id'];
        if (!this.selectedMessage) {
          this.store.dispatch(messageActions.setSelectedMessage({ id }));
        }
      }
    });
  }

  ngOnDestroy() {
    this.selectedMessageSubscription.unsubscribe();
    this.messagelistSubscription.unsubscribe();
  }

  QuillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
  };

  goBackToPrevPage(): void {
    this.location.back();
  }

  deleteMessage() {
    const id = this.route.snapshot.params['id'];
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '175px',
      data: { id }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/', 'messages']);
      }
    });
  }
}

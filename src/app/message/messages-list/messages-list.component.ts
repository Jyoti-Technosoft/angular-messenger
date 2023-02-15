import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { delay, Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Message } from '@services/message';
import * as messageActions from '@store/message/action';
import { DialogDataExampleDialogComponent } from '@app/components/dialog-data-example-dialog/dialog-data-example-dialog.component';
import { EventBusService } from '@app/services/app-eventBus.service';
import { getState } from '@app/store/message/reducers';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public messages = new MatTableDataSource<Message>();
  noData: boolean = false;
  editMessages!: Message;
  preLoader: boolean = true;
  displayedColumns: string[] = ['check', 'name', 'message', 'date', 'actions'];
  showSpinner: boolean = true;
  message$!: Observable<any>;
  messageSubscription!: Subscription;
  clickedRows = new Set<Message>();
  selectedItemlist: any[] = [];
  public getState = getState;

  constructor(
    public dialog: MatDialog,
    private store: Store<any>,
    private routes: Router,
    public eventBusService: EventBusService
  ) {}

  ngOnInit() {
    this.store.dispatch(messageActions.getMessage());
    this.message$ = this.store.select((state) => state.getMessagelist);
    this.messageSubscription = this.message$.pipe(delay(800)).subscribe((data) => {
      if (data?.getMessagelist) {
        this.messages = new MatTableDataSource<Message>(this.mapRows(data?.getMessagelist));
        this.messages.paginator = this.paginator;
        this.messages.sort = this.sort;
        this.showSpinner = false;
      }
    });
  }


  mapRows(data, typeChecked = false) {
    data = data?.map((item: object) => {
      return {
        ...item,
        checked: typeChecked,
      };
    });
    return data;
  }

  deleteMessage(id: any) {
    this.openConfirmDialog(id)
  }

  openConfirmDialog(id) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '175px',
      data: { id }
    })
  }

  editMessage(message: Message) {
    this.openDialog(message);
  }

  openDialog(message: Message): void {
    this.dialog.open(DialogDataExampleDialogComponent, {
      width: '500px',
      height: '450px',
      data: { message },
    });
  }

  clickedRow(event, row: any) {
    const id = row?.id;
    this.store.dispatch(messageActions.setSelectedMessage({ id }));
    this.routes.navigate(['messages', `${row?.id}`]);
  }

  selectRow(event: any, data?: any) {
    if (data) {
      this.messages = new MatTableDataSource<Message>(
        this.mapRows(data, event?.checked)
      );
    }
    this.selectedItemlist = this.messages?.data?.filter(
      (item) => item?.checked
    );
    this.eventBusService.passValue(this.selectedItemlist);
  }

  getfilterData(messages: any) {
    this.messages = messages;
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}

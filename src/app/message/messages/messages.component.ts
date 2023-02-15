import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataExampleDialogComponent } from '@app/components/dialog-data-example-dialog/dialog-data-example-dialog.component';
import { EventBusService } from '@app/services/app-eventBus.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as actions from '@store/message/action';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})

export class MessagesComponent implements OnInit, OnChanges, OnDestroy {
  eventBusSubscription!: Subscription;
  selectedItemlist:any[] = [];
  @Input() messages !:any;
  @Output() filterChanges = new EventEmitter();
  constructor(public dialog: MatDialog, public eventBusService: EventBusService,  private store: Store<any>,) {}

  ngOnInit(): void {
    this.eventBusSubscription = this.eventBusService.subject$.subscribe((data) => {
          this.selectedItemlist = data;
        }
    );
  }

  openDialog(): void {
    this.dialog.open(DialogDataExampleDialogComponent, {
      width: '500px',
      height: '450px',
      data: {},
    });
  }

  deleteMessage() {
    this.selectedItemlist.map((data) => {
      const id = data.id;
      this.store.dispatch(actions.removeMessage({id}));
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.messages.filter = filterValue.trim().toLowerCase();
    this.filterChanges.emit(this.messages)
  }

  ngOnChanges(changes: any) {
  }

  ngOnDestroy() {
    this.eventBusSubscription.unsubscribe();
  }
}

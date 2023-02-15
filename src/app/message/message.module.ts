import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MessagesComponent } from '@app/message/messages/messages.component';
import { DialogDataExampleDialogComponent } from '@app/components/dialog-data-example-dialog/dialog-data-example-dialog.component';
import { MessagesListComponent } from '@app/message/messages-list/messages-list.component';
import { MessageDetailViewComponent } from '@app/message/messages/message-detail-view/message-detail-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { 
        path: '', redirectTo: 'messages-list', pathMatch: 'full' 
      },
      { 
        path: 'messages-list', component: MessagesListComponent 
      },
      { 
        path: ':id', component: MessageDetailViewComponent 
      }
    ],
  },
];

@NgModule({
  declarations: [
    MessagesComponent,
    DialogDataExampleDialogComponent,
    MessagesListComponent,
    MessageDetailViewComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [
    MessagesComponent,
    DialogDataExampleDialogComponent,
    MessagesListComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MessageModule {}

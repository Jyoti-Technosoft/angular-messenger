import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: '', 
    children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./components/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./message/message.module').then((m) => m.MessageModule),
      },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

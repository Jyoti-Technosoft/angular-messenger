import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuillModule } from "ngx-quill";
import { SharedModule } from "@shared/shared.module";
import { HomeComponent } from "@app/components/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent}
]

@NgModule({
  declarations:[
    HomeComponent  
  ],
  imports:[
    SharedModule,
    RouterModule.forChild(routes),
    QuillModule
  ],
  exports:[
    HomeComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomeModule { };
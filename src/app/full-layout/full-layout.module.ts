import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { customMaterialModule } from "@app/custom-material.module";
import { FullLayoutComponent } from "@app/full-layout/full-layout.component";
@NgModule({
    declarations:[
        FullLayoutComponent
    ],
    imports:[
        RouterModule,
        customMaterialModule
    ],
    exports:[
        FullLayoutComponent
    ]
})

export class fulllayoutModule {}
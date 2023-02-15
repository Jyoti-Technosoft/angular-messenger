import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';  
import { MatIconModule } from '@angular/material/icon'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatNativeDateModule } from '@angular/material/core';  
import { MatInputModule } from '@angular/material/input'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
@NgModule({
    declarations:[],
    imports:[],
    exports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatToolbarModule, 
        MatButtonModule,  
        MatIconModule, 
        MatDialogModule, 
        MatDatepickerModule, 
        MatFormFieldModule, 
        MatNativeDateModule, 
        MatInputModule, 
        MatTableModule,  
        MatSnackBarModule, 
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatCardModule
    ]
})
export class customMaterialModule {}
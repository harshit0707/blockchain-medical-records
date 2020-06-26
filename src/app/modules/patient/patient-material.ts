import { NgModule } from '@angular/core';
import {
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        MatSidenavModule,
        MatProgressSpinnerModule
    ]
})
export class PatientMaterialModule { }

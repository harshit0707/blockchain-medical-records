import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewMedicalHistoryComponent } from './components/view-medical-history/view-medical-history.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientMaterialModule } from './patient-material';
import { ViewIndividualDataComponent } from './components/view-individual-data/view-individual-data.component';
import { MedicalRecordsPageComponent } from './components/medical-records-page/medical-records-page.component';
import { ViewMedicalApprovalsComponent } from './components/view-medical-approvals/view-medical-approvals.component';
import { ViewMedicalPermissionsComponent } from './components/view-medical-permissions/view-medical-permissions.component';
import { ViewDoctorsComponent } from './components/view-doctors/view-doctors.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { NoResultsComponent } from 'src/app/shared/no-results/no-results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ ViewMedicalHistoryComponent,
                  ViewIndividualDataComponent,
                  MedicalRecordsPageComponent,
                  ViewMedicalApprovalsComponent,
                  ViewMedicalPermissionsComponent,
                  ViewDoctorsComponent,
                  ProfilePageComponent,
                  LoadingComponent,
                  NoResultsComponent
                ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    PatientMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ ViewIndividualDataComponent ],
})
export class PatientModule { }

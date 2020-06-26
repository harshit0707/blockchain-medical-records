import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicalRecordsPageComponent } from './components/medical-records-page/medical-records-page.component';
import { ViewMedicalHistoryComponent } from './components/view-medical-history/view-medical-history.component';
import { ViewMedicalApprovalsComponent } from './components/view-medical-approvals/view-medical-approvals.component';
import { ViewMedicalPermissionsComponent } from './components/view-medical-permissions/view-medical-permissions.component';
import { ViewDoctorsComponent } from './components/view-doctors/view-doctors.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: 'patient', component: MedicalRecordsPageComponent,
    children: [
      {
        path: 'profile', component: ProfilePageComponent
      },
      {
        path: 'medical-history', component: ViewMedicalHistoryComponent
      },
      {
        path: 'medical-approvals', component: ViewMedicalApprovalsComponent
      },
      {
        path: 'medical-permissions', component: ViewMedicalPermissionsComponent
      },
      {
        path: 'my-doctors', component: ViewDoctorsComponent
      },
      {
        path: '', redirectTo: 'medical-history', pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class PatientRoutingModule { }

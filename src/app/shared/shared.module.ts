import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultsComponent } from './no-results/no-results.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
      LoadingComponent,
      NoResultsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicalApprovalsComponent } from './view-medical-approvals.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { NoResultsComponent } from 'src/app/shared/no-results/no-results.component';
import { PatientMaterialModule } from '../../patient-material';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { MedicalDataService } from '../../services/medical-data.service';

describe('ViewMedicalApprovalsComponent', () => {
  let component: ViewMedicalApprovalsComponent;
  let fixture: ComponentFixture<ViewMedicalApprovalsComponent>;
  let routerSpy;
  let matDialogSpy;
  let medicalDataServiceSpy;
  let mockData = ['0x9B59f65a147124E2e6E9edB6492302C1B84559bB', 'fdsafs', ['fds', 'fdsds'], [1, 2]];


  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    medicalDataServiceSpy = jasmine.createSpyObj('MedicalDataService', ['getApprovalQueueData', 'approveData', 'denyData']);
    medicalDataServiceSpy.getApprovalQueueData.and.returnValue(of([mockData]));
    TestBed.configureTestingModule({
      declarations: [
        ViewMedicalApprovalsComponent,
        LoadingComponent,
        NoResultsComponent
      ],
      imports: [
        PatientMaterialModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: MedicalDataService, useValue: medicalDataServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMedicalApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#openDialog() should work', () => {
    component.approvalData = [['0x9B59f65a147124E2e6E9edB6492302C1B84559bB', 'fdsafs', ['fds', 'fdsds'], [1, 2]]];
    component.openDialog(0);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });
  it('#approveData() should work', () => {
    component.approvalData = [{ index: '' }];
    component.approveData(0);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['medical-approvals']);
  });

  it('#denyData() should work', () => {
    component.approvalData = [{ index: '' }];
    component.denyData(0);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['medical-approvals']);
  });
});

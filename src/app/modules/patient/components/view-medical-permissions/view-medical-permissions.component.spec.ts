import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicalPermissionsComponent } from './view-medical-permissions.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { NoResultsComponent } from 'src/app/shared/no-results/no-results.component';
import { PatientMaterialModule } from '../../patient-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MedicalDataService } from '../../services/medical-data.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ViewMedicalPermissionsComponent', () => {
  let component: ViewMedicalPermissionsComponent;
  let fixture: ComponentFixture<ViewMedicalPermissionsComponent>;
  let medicalDataServiceSpy;
  let routerSpy;
  let mockData = ['0x9B59f65a147124E2e6E9edB6492302C1B84559bB', 'fdsafs', ['fds', 'fdsds'], [1, 2]];


  beforeEach(async(() => {
    medicalDataServiceSpy = jasmine.createSpyObj('MedicalDataService', ['getPermissionsQueueData', 'grantPermission', 'denyPermission'])
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    medicalDataServiceSpy.getPermissionsQueueData.and.returnValue(of([mockData]));
    medicalDataServiceSpy.grantPermission.and.returnValue(of(''));
    medicalDataServiceSpy.denyPermission.and.returnValue(of(''));
    TestBed.configureTestingModule({
      declarations: [
        ViewMedicalPermissionsComponent,
        LoadingComponent,
        NoResultsComponent
      ],
      imports: [
        PatientMaterialModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: MedicalDataService, useValue: medicalDataServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMedicalPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#denyPermission() should work', () => {
    component.denyPermission(0);
    // expect(medicalDataServiceSpy.denyPermission).toHaveBeenCalledWith(0);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['medical-permissions']);
  });
  it('#grantPermission() should work', () => {
    component.grantPermission(0);
    // expect(medicalDataServiceSpy.grantPermission).toHaveBeenCalledWith(0);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['medical-permissions']);
  });

  it('#activateForm() should work', () => {
    component.activateForm();
    expect(component.formActive).toBeTruthy();
  });

  it('#dedactivateForm() should work', () => {
    component.deactivateForm();
    expect(component.formActive).toBeFalsy();
  });
});

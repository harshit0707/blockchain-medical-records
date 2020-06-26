import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicalHistoryComponent } from './view-medical-history.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { NoResultsComponent } from 'src/app/shared/no-results/no-results.component';
import { PatientMaterialModule } from '../../patient-material';
import { of } from 'rxjs';
import { MedicalDataService } from '../../services/medical-data.service';
import { MatDialog } from '@angular/material/dialog';

describe('ViewMedicalHistoryComponent', () => {
  let component: ViewMedicalHistoryComponent;
  let fixture: ComponentFixture<ViewMedicalHistoryComponent>;
  let medicalDataServiceSpy;
  let matDialogSpy;
  let mockData = ['0x9B59f65a147124E2e6E9edB6492302C1B84559bB', 'fdsafs', ['fds', 'fdsds'], [1, 2]];

  beforeEach(async(() => {
    medicalDataServiceSpy = jasmine.createSpyObj('MedicalDataService', ['getMyData']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    medicalDataServiceSpy.getMyData.and.returnValue(of([mockData, mockData]));
    TestBed.configureTestingModule({
      declarations: [
        ViewMedicalHistoryComponent,
        LoadingComponent,
        NoResultsComponent
      ],
      imports: [
        PatientMaterialModule
      ],
      providers: [
        { provide: MedicalDataService, useValue: medicalDataServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#openDialog() should work', () => {
    component.openDialog(0);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('#changePageNumber() should work', () => {
    component.changePageNumber('next');
    component.changePageNumber('previous');
    component.changePageNumber(2);
  });
  
  it('#updateCurrentPageOnDisplay() should work', () => {
    component.totalPages = 1;
    component.startIndex = 10;
    component.currentPageSize = 8;
    component.updateCurrentPageOnDisplay();
    component.startIndex = -10;
    component.updateCurrentPageOnDisplay();
  });

  it('#changePageSize() should work', () => {
    component.changePageSize(12);
  });

  it('#setStartPage() should work', () => {
    component.currentPageOnDisplay = 5;
    component.setStartPage();
  });

  it('#setEndPage() should work', () => {
    component.currentPageOnDisplay = 4;
    component.setEndPage();
  });
});

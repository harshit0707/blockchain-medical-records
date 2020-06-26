import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndividualDataComponent } from './view-individual-data.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('ViewIndividualDataComponent', () => {
  let component: ViewIndividualDataComponent;
  let fixture: ComponentFixture<ViewIndividualDataComponent>;
  let matDialogRefSpy;

  beforeEach(async(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      declarations: [ ViewIndividualDataComponent ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy},
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIndividualDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#closeDialog() should work', () => {
    component.closeDialog();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});

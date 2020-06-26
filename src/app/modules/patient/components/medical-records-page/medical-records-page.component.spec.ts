import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordsPageComponent } from './medical-records-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PatientMaterialModule } from '../../patient-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MedicalRecordsPageComponent', () => {
  let component: MedicalRecordsPageComponent;
  let fixture: ComponentFixture<MedicalRecordsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalRecordsPageComponent ],
      imports: [
        RouterTestingModule,
        PatientMaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecordsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#changeData() should work', () => {
    component.changeData('abc');
    expect(component.title).toEqual('abc');
  })
});

import { Component, OnInit } from '@angular/core';
import { MedicalDataService } from '../../services/medical-data.service';
import { ViewIndividualDataComponent } from '../view-individual-data/view-individual-data.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-view-medical-history',
  templateUrl: './view-medical-history.component.html',
  styleUrls: ['./view-medical-history.component.scss']
})
export class ViewMedicalHistoryComponent implements OnInit {

  dataReceived: boolean;
  medicalHistory: any = [];
  displayMedicalHistory: any = [];
  tempMedicalHistory: any = [];
  pageSizes: any;
  currentPageSize: number;
  totalData: number;
  totalPages: number;
  currentPageOnDisplay: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  displayPageNumbersArray: number[] = [];
  doctor_address_mapping = {
    '0x9B59f65a147124E2e6E9edB6492302C1B84559bB': { doctor_name: 'Marie	Moore', organization_name: 'Individual Practitioner' },
    '0xB50Bf904016a2f3a943b7e3828cED484666FFa64': { doctor_name: 'Sabrina	Medina', organization_name: 'Owl Health' },
    '0x2Dd3655e02Fe8e643B9D0C5E3Ab2Dd02073D481E': { doctor_name: 'Dorothy	Hubbard', organization_name: 'Blade Medicine' },
    '0x0C377C1E54f6E3185fC560691157099158a0cF1F': { doctor_name: 'Wilfred	Brown', organization_name: 'NorthField Care' },
    '0x97EaEd0f3c51827eA72e0BbED101e4035a672a7C': { doctor_name: 'Wilbur	Boyd', organization_name: 'Resonant Care' },
    '0x3f81d9f113C4aA53Eaa3932E66EF107A540196cc': { doctor_name: 'Woodrow	Kennedy', organization_name: 'Paradigm Health' },
    '0x42E950Ef9f67528479Cb2598d139be3c41412EbB': { doctor_name: 'Martha	Douglas', organization_name: 'Individual Practitioner' },
    '0xeef17fD0A023cDf26f96A2574361b9787534Bd72': { doctor_name: 'Pedro	Joseph', organization_name: 'Vantage Care' },
    '0x484ec9eD02B0b2476eBB1BB762ddDA3dC9c1D14B': { doctor_name: 'Mathew	Sanchez', organization_name: 'EaglEeye Care' },
    '0x409F058def5D554f854F38258c2d6Bb110aCe28B': { doctor_name: 'Latoya	Ross', organization_name: 'Indy Medicine' },
  };

  constructor(private medicalDataService: MedicalDataService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.dataReceived = false;
    this.retrieveData();
  }

  retrieveData() {
    this.medicalDataService.getMyData().subscribe((result: any) => {
      this.medicalHistory = result;
      this.medicalHistory.reverse();
      this.displayMedicalHistory = JSON.parse(JSON.stringify(this.medicalHistory));
      this.dataReceived = true;
      this.initializePagination();
    });
  }

  openDialog(index) {
    let medicines = [];
    let newData = [];
    for (let i = 0; i < this.tempMedicalHistory[index][2].length; i++) {
      medicines.push({ name: this.tempMedicalHistory[index][2][i], quantity: this.tempMedicalHistory[index][3][i] });
    }

    newData.push({
      doctor_name: this.doctor_address_mapping[this.tempMedicalHistory[index][0]].doctor_name,
      organization_name: this.doctor_address_mapping[this.tempMedicalHistory[index][0]].organization_name,
      date: this.tempMedicalHistory[index][1],
      medicines: medicines,
    });
    this.dialog.open(ViewIndividualDataComponent, { data: newData[0], height: '90%' });
  }

  initializePagination() {
    this.pageSizes = [{ 'value': 8, 'selected': true },
    { 'value': 12, 'selected': false },
    { 'value': 16, 'selected': false },
    { 'value': 20, 'selected': false }
    ];
    this.totalData = this.displayMedicalHistory.length;
    this.currentPageSize = this.pageSizes[0].value;
    this.totalPages = Math.ceil(this.totalData / this.currentPageSize);
    this.currentPageOnDisplay = 1;
    this.updateDataIndexes();
    this.updateTempMedicalHistory();
    this.setStartPage();
    this.setEndPage();
    this.displayPageNumbersArray = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      this.displayPageNumbersArray.push(i);
    }
  }

  updateDataIndexes() {
    this.startIndex = (this.currentPageOnDisplay - 1) * this.currentPageSize;
    this.endIndex = this.startIndex + this.currentPageSize;
    this.updateTempMedicalHistory();
  }

  updateTempMedicalHistory() {
    this.tempMedicalHistory = this.displayMedicalHistory.slice(this.startIndex, this.endIndex);
  }

  setStartPage() {
    if (this.currentPageOnDisplay >= 4) {
      this.startPage = this.currentPageOnDisplay - 1;
    } else {
      this.startPage = 1;
    }
    if (this.startPage >= this.totalPages - 2) {
      this.startPage = this.totalPages -= 3;
    }
    if (this.startPage <= 2) {
      this.startPage = 1;
    }
  }

  setEndPage() {
    if (this.currentPageOnDisplay > 3) {
      this.endPage = this.currentPageOnDisplay + 2;
    } else {
      this.endPage = 4;
    }
    if (this.endPage >= this.totalPages-1) {
      this.endPage = this.totalPages;
    }
  }

  changePageNumber(value: any) {
    if (value === 'next') {
      this.currentPageOnDisplay += 1;
    } else if (value === 'previous') {
      this.currentPageOnDisplay -= 1;
    } else {
      this.currentPageOnDisplay = value;
    }
    this.setStartPage();
    this.setEndPage();
    this.displayPageNumbersArray = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      this.displayPageNumbersArray.push(i);
    }
    this.updateDataIndexes();
  }

  updateCurrentPageOnDisplay() {
    this.currentPageOnDisplay = Math.floor(this.startIndex / this.currentPageSize) + 1;
    if (this.currentPageOnDisplay > this.totalPages) {
      this.currentPageOnDisplay = this.totalPages;
    }
    if (this.currentPageOnDisplay < 1) {
      this.currentPageOnDisplay = 1;
    }
  }
  
  changePageSize(value: any) {
    this.currentPageSize = value;
    for (const size of this.pageSizes) {
      if (size.value === value) {
        size.selected = true;
      } else {
        size.selected = false;
      }
    }
    this.totalPages = Math.ceil(this.totalData / this.currentPageSize);
    this.updateCurrentPageOnDisplay();
    this.setStartPage();
    this.setEndPage();
    this.displayPageNumbersArray = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      this.displayPageNumbersArray.push(i);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MedicalDataService } from '../../services/medical-data.service';
import { MatDialog } from '@angular/material';
import { ViewIndividualDataComponent } from '../view-individual-data/view-individual-data.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-medical-approvals',
  templateUrl: './view-medical-approvals.component.html',
  styleUrls: ['./view-medical-approvals.component.scss']
})
export class ViewMedicalApprovalsComponent implements OnInit {

  dataReceived: boolean;
  approvalData: any;
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
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.dataReceived = false;
    this.medicalDataService.getApprovalQueueData().subscribe((result: any) => {
      this.approvalData = result;
      this.approvalData = this.approvalData.filter(function(data) {
        return data.index !== '0';
      })
      this.approvalData.reverse();
      this.dataReceived = true;
    });
  }

  openDialog(index) {
    let medicines = [];
    let newData = [];
    for (let i = 0; i < this.approvalData[index][2].length; i++) {
      medicines.push({ name: this.approvalData[index][2][i], quantity: this.approvalData[index][3][i] });
    }

    newData.push({
      doctor_name: this.doctor_address_mapping[this.approvalData[index][0]].doctor_name,
      organization_name: this.doctor_address_mapping[this.approvalData[index][0]].organization_name,
      date: this.approvalData[index][1],
      medicines: medicines,
    });
    this.dialog.open(ViewIndividualDataComponent, { data: newData[0], height: '90%' });
  }

  approveData(index) {
    index = this.approvalData[index].index;
    this.medicalDataService.approveData(index);
    // this.router.navigate(['medical-approvals']);
    location.reload();
  }

  denyData(index) {
    index = this.approvalData[index].index;
    this.medicalDataService.denyData(index);
    // this.router.navigate(['medical-approvals']);
    location.reload();
  }
}

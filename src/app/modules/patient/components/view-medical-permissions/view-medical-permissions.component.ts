import { Component, OnInit } from '@angular/core';
import { MedicalDataService } from '../../services/medical-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-medical-permissions',
  templateUrl: './view-medical-permissions.component.html',
  styleUrls: ['./view-medical-permissions.component.scss']
})
export class ViewMedicalPermissionsComponent implements OnInit {

  dataReceived: boolean;
  formActive: boolean;
  permissionsData: any;
  timePeriod = this.fb.group({
    hours: ['', [Validators.required, Validators.max(24), Validators.min(1)]],
    days: ['', [Validators.required, Validators.max(30), Validators.min(0)]]
  });
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
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.dataReceived = false;
    this.formActive = false;
    this.medicalDataService.getPermissionsQueueData().subscribe((result: any) => {
      this.permissionsData = result;
      this.permissionsData = this.permissionsData.filter(function(data) {
        return data.index !== '0';
      })
      this.permissionsData.reverse();
      this.dataReceived = true;
    });
  }

  denyPermission(index) {
    this.medicalDataService.denyPermission(index);
    // this.router.navigate(['medical-permissions']);
    location.reload();
  }

  grantPermission(index) {
    let hours = this.timePeriod.get('hours').value*60*60;
    let days = this.timePeriod.get('days').value*24*60*60;
    let time = hours + days;
    this.medicalDataService.grantPermission(index, time);
    // this.router.navigate(['medical-permissions']);
    location.reload();
  }

  activateForm() {
    this.formActive = true;
  }

  deactivateForm() {
    this.formActive = false;
  }
}

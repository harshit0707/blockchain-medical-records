import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-medical-records-page',
  templateUrl: './medical-records-page.component.html',
  styleUrls: ['./medical-records-page.component.scss']
})
export class MedicalRecordsPageComponent implements OnInit {

  @ViewChild('sideNav') sideNav: MatSidenav;
  sideNavOptions: {}[];
  title: string;
  notifications: number[];

  constructor() { }

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.sideNavOptions = [
      {value: 'Medical History', route: 'medical-history'},
      {value: 'Pending Medical Approvals', route: 'medical-approvals'},
      {value: 'Manage Medical Permissions', route: 'medical-permissions'},
      {value: 'My Doctors', route: 'my-doctors'}
    ];
    this.title = this.sideNavOptions[0]['value'];
  }

  changeData(title) {
    this.sideNav.close();
    this.title = title;
  }
}

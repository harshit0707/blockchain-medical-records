import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navItems = [
    {
      'name': 'Home',
      'url': 'home'
    },
    {
      'name': 'Medical Records',
      'url': 'patient'
    },
    // {
    //   'name': 'Providers',
    //   'url': 'providers'
    // },
    {
      'name': 'Help',
      'url': 'patient-help'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}

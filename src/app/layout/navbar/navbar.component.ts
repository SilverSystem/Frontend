import { Component, OnInit } from '@angular/core';
import {IMG_LOGO } from 'src/app/shared/constants/app.const';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {
  logo = IMG_LOGO;
  momentDate: Date;
  circleColor  = '#e65300';
  initials = 'IC';
  colors = [
    '#EB7181',
    '#468547',
    '#FFD558',
    '#3670B2',
    '#e65300',
    '#0288d1',
    '#ff810e',
    '##45ba4e',
    '#fce30c',
    '#eb445a',
    '#293241'
];
  constructor() { }

  ngOnInit() {
    this.createInititals('');
    this.momentDate = new Date();
  }

  createInititals(name: string): void {
    let initials = 'IC';
    if(name !== '' && name !== undefined){
      const r = name.split(' ');
      initials = r.length === 1 ? `${r[0].charAt(0).toUpperCase()}` : `${r[0].charAt(0).toUpperCase()}${r[1].charAt(0).toUpperCase()}`;
    }
    this.initials = initials;
  }
}

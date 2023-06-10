/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { selectColor } from 'src/app/shared/constants/app.const';
import { ConstruccionService } from '../../services/construccion.service';
import { fichasParser } from 'src/app/shared/helpers/parsers';

@Component({
  selector: 'app-dashboard-fichas',
  templateUrl: './dashboard-fichas.component.html',
  styleUrls: ['./dashboard-fichas.component.scss'],
})
export class DashboardFichasComponent  implements OnInit {
  public searchSheetsForm: FormGroup;
  p= 1;
  fichas: Array<any> = [];
  //[
  //   fichas: Array<any> ={
  //   startDate:new Date(),
  //   endDate:'',
  //   approverName: 'Andres Jimenez',
  //   state: 'sinAsignar'
  // },
  // {
  //   startDate:new Date('May 9,2023'),
  //   endDate:'',
  //   approverName: 'Virginia Pinto',
  //   state: 'enCurso'
  // },
  // {
  //   startDate:new Date('May 2,2023'),
  //   endDate:new Date(),
  //   approverName: 'Carlos Avila',
  //   state: 'aprobadaCompletamente'
  // },
  // {
  //   startDate:new Date('April 22, 2023'),
  //   endDate:'',
  //   approverName: 'Andreina Bermudez',
  //   state: 'enCurso'
  // },
  // {
  //   startDate:new Date('March 13, 2023'),
  //   endDate:'',
  //   approverName: 'Jose Tomas Santos',
  //   state: 'conRechazo'
  // },
  // {
  //   startDate:new Date('April 27, 2023'),
  //   endDate:'',
  //   approverName: 'Trinidad Perez',
  //   state: 'enCurso'
  // },
  // {
  //   startDate:new Date(),
  //   endDate:'',
  //   approverName: 'Juan Palacios',
  //   state: 'pendientes'
  // },
  // ];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private construccionService: ConstruccionService
  ) { }

  ngOnInit() {
    this.setupForm();
    this.construccionService.getFichasResumen().subscribe();
    this.construccionService.unidadesCurriculares$.subscribe(data =>{
      if(data !== undefined){
        console.log('a la data',data);
        const cleanedData = fichasParser(data);
        console.log('la limpiada',cleanedData);
        this.fichas= cleanedData;
      }
    });
  }
  showStates(){
    return Object.values(this.construccionService.estadosFichas);
  }
  setupForm(){
    this.searchSheetsForm = this.formBuilder.group({
      searchNameApprover: [null],
      searchState:[null],
      searchStartDate: [null],
      searchEndDate: [null],
    });
  }
  redirect(id?: number){
    return id ? this.router.navigate(['construccion',id]) : this.router.navigate(['construccion/0']);
  }
  selectColor(conditionCA) {
    return selectColor(conditionCA);
  }
}

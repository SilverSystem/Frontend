import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-fichas',
  templateUrl: './dashboard-fichas.component.html',
  styleUrls: ['./dashboard-fichas.component.scss'],
})
export class DashboardFichasComponent  implements OnInit {
  public searchSheetsForm: FormGroup;
    estadosFichas: any = {
    enCurso: 'En curso',
    aprobadaCompletamente: 'Aprobada completamente',
    conRechazo: 'Con rechazo',
    sinAsignar: 'Sin asignar',
    pendientes: 'Pendientes',
  };
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.setupForm();
  }
  showStates(){
    return Object.values(this.estadosFichas);
  }
  setupForm(){
    this.searchSheetsForm = this.formBuilder.group({
      searchNameApprover: [null],
      searchState:[null],
      searchStartDate: [null],
      searchEndDate: [null],
    });
  }
}

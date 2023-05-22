import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-guia-evaluacion',
  templateUrl: './guia-evaluacion.component.html',
  styleUrls: ['./guia-evaluacion.component.scss'],
})
export class GuiaEvaluacionComponent implements OnInit {
  public guiasEvaluacionForm: FormGroup;
  formasparticipacion = ['Participación Activa', 'Participación grupal', 'Participación individual',
    'Autoevaluación', 'Undireccional', 'Heteroevaluación', 'Coevaluación'];
  @Input() numeration: number;
  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setup();
  }

  setup() {
    this.guiasEvaluacionForm = this.formBuilder.group({
      procedimientoDiagnostico:[],
      tecnicaDiagnostico:[],
      instrumentoDiagnostico:[],
      procedimientoFormativa:[],
      tecnicaFormativa:[],
      instrumentoFormativa:[],
      procedimientoSumativa:[],
      tecnicaSumativa:[],
      instrumentoSumativa:[],
      formaParticipacionDiagnostica: [],
      formaParticipacionFormativa: [],
      formaParticipacionSumativa: []
    });
  }
  cancel() {
    this.modalController.dismiss();
  }
}

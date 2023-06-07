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
  @Input() guiaEvaluacion: any;
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
      procedimientoDiagnostico:[this.guiaEvaluacion !== null ? this.guiaEvaluacion.procedimientoDiagnostico : null],
      tecnicaDiagnostico:[this.guiaEvaluacion !== null ? this.guiaEvaluacion.tecnicaDiagnostico : null],
      instrumentoDiagnostico:[this.guiaEvaluacion !== null ? this.guiaEvaluacion.instrumentoDiagnostico : null],
      procedimientoFormativa:[this.guiaEvaluacion !== null ? this.guiaEvaluacion.procedimientoFormativa : null],
      tecnicaFormativa:[this.guiaEvaluacion !== null ? this.guiaEvaluacion.tecnicaFormativa : null],
      instrumentoFormativa:[this.guiaEvaluacion !== null ? this.guiaEvaluacion.instrumentoFormativa : null],
      procedimientoSumativa:[this.guiaEvaluacion !== null ? this.guiaEvaluacion.procedimientoSumativa : null],
      tecnicaSumativa:[this.guiaEvaluacion !== null ? this.guiaEvaluacion.tecnicaSumativa : null],
      instrumentoSumativa:[this.guiaEvaluacion !== null ? this.guiaEvaluacion.instrumentoSumativa : null],
      formaParticipacionDiagnostica: [this.guiaEvaluacion !== null ? this.guiaEvaluacion.formaParticipacionDiagnostica : null],
      formaParticipacionFormativa: [this.guiaEvaluacion !== null ? this.guiaEvaluacion.formaParticipacionFormativa : null],
      formaParticipacionSumativa: [this.guiaEvaluacion !== null ? this.guiaEvaluacion.formaParticipacionSumativa : null]
    });
  }
  cancel() {
    this.modalController.dismiss();
  }
  async presentCreatedToast() {
    const toast = await this.toastController.create({
      message: 'Guía de evaluación creada exitosamente',
      icon: 'checkmark-circle',
      position: 'bottom',
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
  submit(){
    const form = this.guiasEvaluacionForm.value;
  console.log('Esto termino siendo el form',form);
  const post = {
    procedimientoDiagnostico:form.procedimientoDiagnostico,
    tecnicaDiagnostico:form.tecnicaDiagnostico,
    instrumentoDiagnostico:form.instrumentoDiagnostico,
    procedimientoFormativa:form.procedimientoFormativa,
    tecnicaFormativa:form.tecnicaFormativa,
    instrumentoFormativa:form.instrumentoFormativa,
    procedimientoSumativa:form.procedimientoSumativa,
    tecnicaSumativa:form.tecnicaSumativa,
    instrumentoSumativa:form.instrumentoSumativa,
    formaParticipacionDiagnostica: form.formaParticipacionDiagnostica,
    formaParticipacionFormativa: form.formaParticipacionFormativa,
    formaParticipacionSumativa: form.formaParticipacionSumativa
  };
  console.log('Esto termino siendo el post',post);
  this.modalController.dismiss(post);
  this.presentCreatedToast();
  }
}

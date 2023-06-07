import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mapa-aprendizaje',
  templateUrl: './mapa-aprendizaje.component.html',
  styleUrls: ['./mapa-aprendizaje.component.scss'],
})
export class MapaAprendizajeComponent implements OnInit {
  public mapaForm: FormGroup;
  bulletPoints = {};
  criterios = [];
  observacionDirecta = [];
  producto = [];
  conocimiento = [];
  lapsos = [];
  @Input() numeration: number;
  @Input() mapaAprendizaje: any;
  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log('Esto a llegado como info de la db',this.mapaAprendizaje);
    this.setup();
  }

  setup() {
    this.mapaForm = this.formBuilder.group({
      logroParticipante: [this.mapaAprendizaje !== null ? this.mapaAprendizaje.logroParticipante : null],
      horasTeoricas: [this.mapaAprendizaje !== null ? this.mapaAprendizaje.horasTeoricas : null],
      horasPracticas: [this.mapaAprendizaje !== null ? this.mapaAprendizaje.horasPracticas : null],
      ejeTematico: [this.mapaAprendizaje !== null ? this.mapaAprendizaje.ejeTematico : null],
      criteriosDesempeno: [null],
      evidenciasDesempeno: [null],
      lapsoEjecucion: [null]
    });
    if(this.mapaAprendizaje !== null){
      this.bulletPoints= this.mapaAprendizaje.detallesEjeTematico || {};
      this.criterios= this.mapaAprendizaje.criteriosDesempeno || [];
      this.observacionDirecta= this.mapaAprendizaje.evidenciasDesempeno.observacionDirecta || [];
      this.producto= this.mapaAprendizaje.evidenciasDesempeno.producto || [];
      this.conocimiento= this.mapaAprendizaje.evidenciasDesempeno.conocimiento || [];
      this.lapsos= this.mapaAprendizaje.lapsoEjecucion || [];
    }
  }
  cancel() {
    this.modalController.dismiss();
  }
  mainSubType(event: any) {
    console.log(event.target.value);
    const userInput = event.target.value;
    if (userInput !== '') {
      this.bulletPoints[`${userInput}_${this.objKeys().length+1}`] = [];
      event.target.value = '';
    }
  }
  objKeys() {
    return Object.keys(this.bulletPoints);
  }
  dotSubType(event: any, field: string) {
    console.log(event.target.value);
    const userInput = event.target.value;
    if (userInput !== '') {
      this.bulletPoints[field] = [...this.bulletPoints[field], userInput];
      event.target.value = '';
    }
  }
  pushList(event: any, field: string) {
    console.log(event.target.value);
    const userInput = event.target.value;
    if (userInput !== '') {
      this[field] = [...this[field], userInput];
      event.target.value = '';

    }
  }
  replaced(subType: string){
    const copy = subType;
    return copy.replace(/_[0-9]/,'');
  }
  async presentCreatedToast() {
    const toast = await this.toastController.create({
      message: this.mapaAprendizaje !== null ? 'Mapa de aprendizaje actualizado exitosamente': 'Mapa de aprendizaje creado exitosamente',
      icon: 'checkmark-circle',
      position: 'bottom',
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
  submit(){
    const form = this.mapaForm.value;
    console.log('Esto termino siendo el form',form);
    const post = {
      logroParticipante: form.logroParticipante,
      horasTeoricas: form.horasTeoricas,
      horasPracticas: form.horasPracticas,
      ejeTematico: form.ejeTematico,
      detallesEjeTematico: this.bulletPoints,
      criteriosDesempeno: this.criterios,
      evidenciasDesempeno: {
        observacionDirecta:this.observacionDirecta,
        producto:this.producto,
        conocimiento:this.conocimiento
      },
      lapsoEjecucion: this.lapsos
    };
    console.log('Esto termino siendo el post',post);
    this.modalController.dismiss(post);
    this.presentCreatedToast();
  }
}

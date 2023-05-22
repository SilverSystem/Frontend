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
  lapsos= [];
  @Input() numeration: number;
  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setup();
  }

  setup(){
    this.mapaForm= this.formBuilder.group({
      logroParticipante: [],
      horasTeoricas:[],
      horasPracticas:[],
      ejeTematico:[],
      criteriosDesempeno:[],
      evidenciasDesempeno:[],
      lapsoEjecucion:[]
    });
  }
  cancel() {
    this.modalController.dismiss();
 }
 mainSubType(event: any){
  console.log(event.target.value);
  const userInput = event.target.value;
  if(userInput !== ''){
    this.bulletPoints[userInput] = [];
    event.target.value = '';
  }
 }
 objKeys(){
  return Object.keys(this.bulletPoints);
 }
 dotSubType(event: any, field: string){
  console.log(event.target.value);
  const userInput = event.target.value;
  if(userInput !== ''){
    this.bulletPoints[field] = [...this.bulletPoints[field],userInput] ;
    event.target.value = '';
  }
 }
 pushList(event: any, field: string){
  console.log(event.target.value);
  const userInput = event.target.value;
  if(userInput !== ''){
    this[field] = [...this[field],userInput] ;
    event.target.value = '';

  }
}
}

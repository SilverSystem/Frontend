import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-estrategias-metodologicas',
  templateUrl: './estrategias-metodologicas.component.html',
  styleUrls: ['./estrategias-metodologicas.component.scss'],
})
export class EstrategiasMetodologicasComponent  implements OnInit {
  public estrategiasForm: FormGroup;
  estrategiasEnsenanzas = [];
  mediosInstruccionales = [];
  tecnicasInstruccionales = [];
  estrategiasAprendizaje = {
    cognitivas: '',
    metaCognitivas: '',
    estrategiaRegulacionRecursos: '',
    motivacionales: '',
  };
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
    this.estrategiasForm= this.formBuilder.group({
      estrategiasdeEnsenanza: [],
      mediosInstruccionales:[],
      tecnicasInstruccionales:[],
      cognitivas:[],
      metacognitivas:[],
      estrategiasregulacionRecursos:[],
      motivacionales:[]
    });
  }
  cancel() {
    this.modalController.dismiss();
 }
 tecniquesRows(event: any,field: string){
  console.log(event.target.value);
  const userInput = event.target.value;
  if(userInput !== ''){
    this[field] = [...this[field],userInput];
    event.target.value = '';
  }
 }
 objKeys(){
  return Object.keys(this.estrategiasAprendizaje);
 }
 dotSubType(event: any, field: string){
  console.log(event.target.value);
  const userInput = event.target.value;
  if(userInput !== ''){
    this.estrategiasAprendizaje[field] = [...this.estrategiasAprendizaje[field],userInput] ;
    event.target.value = '';
  }
 }
 pushList(event: any, field: string){
  console.log(event.target.value);
  const userInput = event.target.value;
  if(userInput !== ''){
    this.estrategiasAprendizaje[field] = `${userInput}` ;
    event.target.value = '';

  }
}
}

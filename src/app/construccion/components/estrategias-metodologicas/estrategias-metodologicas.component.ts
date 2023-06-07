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
      estrategiasdeEnsenanza: [null],
      mediosInstruccionales:[null],
      tecnicasInstruccionales:[null],
      cognitivas:[null],
      metaCognitivas:[null],
      estrategiasRegulacionRecursos:[null],
      motivacionales:[null]
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
async presentCreatedToast() {
  const toast = await this.toastController.create({
    message: 'Estrategias metodológicas, didácticas y pedagógicas creadas exitosamente',
    icon: 'checkmark-circle',
    position: 'bottom',
    color: 'success',
    duration: 2000,
  });
  toast.present();
}
submit(){
  const form = this.estrategiasForm.value;
  console.log('Esto termino siendo el form',form);
  const post = {
      estrategiasdeEnsenanza: this.estrategiasEnsenanzas,
      mediosInstruccionales:this.mediosInstruccionales,
      tecnicasInstruccionales:this.tecnicasInstruccionales,
      cognitivas:form.cognitivas,
      metaCognitivas:form.metaCognitivas,
      estrategiasRegulacionRecursos:form.estrategiasRegulacionRecursos,
      motivacionales:form.motivacionales
  };
  console.log('Esto termino siendo el post',post);
  this.modalController.dismiss(post);
  this.presentCreatedToast();
}
}

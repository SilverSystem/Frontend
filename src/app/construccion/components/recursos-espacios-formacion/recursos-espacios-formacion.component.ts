import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recursos-espacios-formacion',
  templateUrl: './recursos-espacios-formacion.component.html',
  styleUrls: ['./recursos-espacios-formacion.component.scss'],
})
export class RecursosEspaciosFormacionComponent  implements OnInit {
  public recursosForm: FormGroup;
  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setup();
  }

  setup() {
    this.recursosForm = this.formBuilder.group({
      materiales: this.formBuilder.array([]),
      equipos:this.formBuilder.array([]),
      programas:this.formBuilder.array([]),
      herramientas:this.formBuilder.array([]),
      maquinarias:this.formBuilder.array([]),
      instrumentos:this.formBuilder.array([]),
      equiposSeguridad:this.formBuilder.array([]),
    });
  }

  dynamicInputs(field: string): FormArray {
    return this.recursosForm.get(field) as FormArray;
  }
  addNewInput(field: string): void {
    for (let i = 0; i < 4; i++) {
      this.dynamicInputs(field).push(this.formBuilder.control('', Validators.required));
    }
  }

  onSubmit(): void {
    // Handle form submission
  }
  cancel() {
    this.modalController.dismiss();
  }

}

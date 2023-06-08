import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-rejection-reason-modal',
  templateUrl: './rejection-reason-modal.component.html',
  styleUrls: ['./rejection-reason-modal.component.scss'],
})
export class RejectionReasonModalComponent  implements OnInit {
  rejectReason: FormGroup;
  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.setup();
  }
  cancel() {
    this.modalController.dismiss();
  }
  setup(){
    this.rejectReason = this.formBuilder.group({
      reason: [null,[Validators.required]]
    });
  }
  async presentToastSignInFailed(backMsg: string) {
    const toast = await this.toastController.create({
      message: backMsg,
      icon: 'checkmark-circle',
      position: 'bottom',
      color: 'success',
      duration: 2500,
    });
    toast.present();
  }
  rejection(){
    const post = this.rejectReason.value;
    this.modalController.dismiss(post);
    this.presentToastSignInFailed('Razon de rechazo guardada correctamente');
  }
}

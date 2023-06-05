import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-in-development',
  templateUrl: './in-development.component.html',
  styleUrls: ['./in-development.component.scss'],
})
export class InDevelopmentComponent  implements OnInit {

  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.presentToast();
    this.presentAlert();
  }

  cancel() {
    this.modalController.dismiss();
 }

 async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Intenta acceder a una ruta no existente o que actualmente se encuentra en desarrollo',
    message: 'Presione el boton de Ok para ser redireccionado a la pagina de inicio para seguir usando la aplicacion',
    buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          this.alertController.dismiss();
          this.redirect();
        }
      }
    ]
  });

  await alert.present();
}

 async presentToast() {
  const toast = await this.toastController.create({
    message:'¡En desarrollo!',
    icon:'close-circle',
    position: 'bottom',
    color:'warning',
    duration: 4000
  });
  toast.present();
  }

  redirect(){
    this.router.navigate(['construccion']);
  }
}

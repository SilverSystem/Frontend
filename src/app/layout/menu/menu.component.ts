import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IMG_LOGO, menuRoutes } from 'src/app/shared/constants/app.const';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  logo = IMG_LOGO;
  menuRoutes: Array<any> = menuRoutes;
  currentUserType = '';
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    const obtainedUserType= localStorage.getItem('currentSession');
    if(!obtainedUserType){
      this.router.navigate(['/login']);
    } else{
      this.currentUserType = JSON.parse(obtainedUserType).user_type;
    }
  }
  checkPermissions(label: string){
    const actualMenuRoute = menuRoutes.find(el => el.label === label);
    return actualMenuRoute ? actualMenuRoute.visibility.includes(this.currentUserType): false;
  }
  async presentAlertConfirmLogout() {
    const alert = await this.alertController.create({
      header: `¿Está seguro que desea cerrar sesión?`,
      message: 'Al presionar Si, finalizara su sesión actual',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.alertController.dismiss();
          },
        },
        {
          text: 'Si',
          handler: () => {
            this.authService.logout();
            this.alertController.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }
  onIonInfinite(ev) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}

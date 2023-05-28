import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import {IMG_LOGO } from 'src/app/shared/constants/app.const';
@Component({
  selector: 'app-confirm-password-recovery',
  templateUrl: './confirm-password-recovery.component.html',
  styleUrls: ['./confirm-password-recovery.component.scss'],
})
export class ConfirmPasswordRecoveryComponent  implements OnInit {
  passwordType = 'password';
  passwordShown: boolean;
  isButtonEnabled = false;
  openWarning: boolean;
  errorCode: boolean;
  logo = IMG_LOGO;
  confirmRequest;
  public confirmForm: FormGroup;
  verify: any = {
    first: '',
    second: '',
    third: '',
    forth: '',
    fifth: '',
    sixth: '',
  };
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.confirmRequest =
          this.router.getCurrentNavigation()?.extras?.state?.['data'];
      }
    });
    this.setupForm();
  }
  setupForm() {
    this.confirmForm = this.formBuilder.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
          ),
        ],
      ],
    });
  }
  onSubmit() {
    const code =
      this.verify.first +
      this.verify.second +
      this.verify.third +
      this.verify.forth +
      this.verify.fifth +
      this.verify.sixth;
    const body = {
      code,
      newPassword: this.confirmForm.value.newPassword,
      email: this.confirmRequest,
    };

    this.authService.confirmPasswordRecovery(body).subscribe((request) => {
      if (request.metadata.statusCode === 200) {
        const navigationExtras: NavigationExtras = {
          state: {
            data: this.confirmRequest
          }
        };
        this.router.navigate(['/sign-in'], navigationExtras);
        this.presentToastPasswordChanged('Contraseña actualizada exitosamente');
      }
    }, ((err) => {
      console.log('el error mfa -->', err);
      if (err.error.data.errorMessage === 'Código de recuperación de contraseña incorrecto') {
        this.errorCode = true;
        this.verify.first = '';
        this.verify.second = '';
        this.verify.third = '';
        this.verify.forth = '';
        this.verify.fifth = '';
        this.verify.sixth = '';
      }
      this.presentToastSignInFailed(err.error.data.errorMessage);
    }));
  }
  onPaste(event) {
    const clipboardData = event.clipboardData.getData('text');
    const splittedClipboard = clipboardData.split('');
    let index = 0;
    if (!isNaN(Number(clipboardData)) && splittedClipboard.length === 6) {
      Object.keys(this.verify).map(key => {
        this.verify[key] = splittedClipboard[index];
        index++;
      });
    }
  }
  mfaController(event, next, prev) {
    if (event.target.value.length < 1 && prev && event.keyCode === 8) {
      prev.setFocus();
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    } else {
      return 0;
    }
    return 0;
  }
  validateExistCode(event) {
    let prev = true;
    let current = false;
    this.isButtonEnabled = false;
    Object.keys(this.verify).map(key => {
      if (this.verify[key]) {
        current = true;
        prev = current;
      } else {
        current = false;
        prev = current;
      }
    });
    if (current && prev) {
      this.isButtonEnabled = true;
    }
  }
  togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }
  async presentToastPasswordChanged(backMsg: string) {
    const toast = await this.toastController.create({
      message: backMsg,
      icon: 'checkmark-circle',
      position: 'bottom',
      color: 'success',
      duration: 2500,
    });
    toast.present();
  }
  async presentToastSignInFailed(backMsg: string) {
    const toast = await this.toastController.create({
      message: backMsg,
      icon: 'close-circle',
      position: 'bottom',
      color: 'danger',
      duration: 1500,
    });
    toast.present();
  }
  resendCode() {
    this.authService.reSendCode(this.confirmRequest).subscribe(request => {
      console.log('request plsss',request);
      this.presentToastPasswordChanged('Reenvio de código de verificación exitoso');
    });
  }
}

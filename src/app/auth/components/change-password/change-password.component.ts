import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import {IMG_LOGO } from 'src/app/shared/constants/app.const';
import { customEmailValidator, validationErrors } from 'src/app/shared/helpers/custom-validators';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  logo = IMG_LOGO;
  passwordShown: boolean;
  passwordType = 'password';
  noMatch = true;
  progressBar: boolean;
  public recoveryForm: FormGroup;
  signUpRequest;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.signUpRequest =
          this.router.getCurrentNavigation()?.extras?.state?.['data'];
      }
    });
    this.setupForm();
  }
  setupForm() {
    this.recoveryForm = this.formBuilder.group({
      recoveryEmail: [this.signUpRequest ? this.signUpRequest : null, {
        validators: [Validators.required, customEmailValidator],
        updateOn: 'blur'
      }],
    });
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

  onSubmit() {
    this.progressBar = true;
    const post = this.recoveryForm.value;
    console.log('lo que se da', post);
    const formvalue = this.recoveryForm.value;
    this.authService.passwordRecovery(formvalue).subscribe(request => {
      console.log('el requesteoo',request);
      const navigationExtras: NavigationExtras = {
        state: {
          data: formvalue.recoveryEmail
        }
      };
      this.router.navigate(['/login/confirmar-recuperacion'], navigationExtras);
    },
      (err) => {
        const messageError =
          err.error.data.errorMessage;
        this.presentToastSignInFailed('!Error:' + messageError);
      });
  }
  async presentToastSignInFailed(backMsg: string) {
    const toast = await this.toastController.create({
      message: backMsg,
      icon: 'close-circle',
      position: 'bottom',
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }
  showErrors(control: string) {
    const err = { ...this.recoveryForm.controls[control].errors };
    const errors = Object.keys(err);
    return validationErrors[errors[0]];
  }
}

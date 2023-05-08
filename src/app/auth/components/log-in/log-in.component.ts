import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import {IMG_LOGO } from 'src/app/shared/constants/app.const';
import { customAdminEmailValidator,validationErrors } from 'src/app/shared/helpers/custom-validators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent  implements OnInit {
  logo = IMG_LOGO;
  passwordShown: boolean;
  passwordType='password';
  isAuthorized: boolean;
  progressBar: boolean;
  public loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, {
        validators: [Validators.required,customAdminEmailValidator],
        updateOn: 'blur'
      },],
      password: [null, [Validators.minLength(4), Validators.required]],
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
  async presentToastMissingFields(backMsg: string) {
    const toast = await this.toastController.create({
      message: backMsg,
      icon: 'close-circle',
      position: 'bottom',
      color: 'danger',
      duration: 1500,
    });
    toast.present();
  }
  async presentToastSignInFailed(backMsg: string) {
    const toast = await this.toastController.create({
      message: backMsg,
      icon: 'close-circle',
      position: 'bottom',
      color: 'danger',
      duration: 2500,
    });
    toast.present();
  }

  showErrors(control: string){
    const err = {...this.loginForm.controls[control].errors};
    const errors = Object.keys(err);
    return validationErrors[errors[0]];
  }

  onSubmit(){
    this.progressBar = true;
    const post = this.loginForm.value;
    console.log('el form',post);
    if(!post.email || !post.password){
      this.presentToastMissingFields('Faltan campos por rellenar para poder iniciar sesión');
    } else{
      this.authService.login(post).subscribe({
        next: (request) =>{
          console.log('la request',request);
          this.router.navigate(['/construccion']);
        },
        error:(err) => {
          console.log(err);
        }
      });
    }
  }
}

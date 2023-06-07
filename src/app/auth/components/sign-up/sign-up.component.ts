import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import {
  customEmailValidator,
  specialCharactersValidator,
  onlyNumbersValidator,
  validationErrors
} from 'src/app/shared/helpers/custom-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {
  flagInfo: boolean;
  userTypes: Array<any> = ['Constructor Curricular','Coordinador curricular','Aprobador','Supervisor','Administrador','Presidencia'];
  public signUpForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.setupForm();
  }
  setupForm(){
    this.signUpForm = this.formBuilder.group({
      email: [null,{
        validators: [Validators.required,customEmailValidator],
        updateOn: 'blur'
      }],
      password:['qJ23&4yATBFR'],
      userType:[null,[Validators.required]],
      ci:[null,[Validators.required,onlyNumbersValidator]],
      name:[null,[Validators.required,specialCharactersValidator]],
      lastName:[null,[Validators.required,specialCharactersValidator]],
    });
  }
  showErrors(control: string) {
    const err = { ...this.signUpForm.controls[control].errors };
    const errors = Object.keys(err);
    return validationErrors[errors[0]];
  }
  submit(){
    const user = this.signUpForm.value;
    console.log(user);
    this.authService.signUp(user).subscribe(response =>{
      console.log('Se registro un usuario y se respondio con',response);
    });
  }
}

import { AbstractControl } from '@angular/forms';
import { emailRegex,specialCharactersRegex,onlyNumbersRegex,socialReasonRegex } from '../constants/app.const';

export const validationErrors = {
  required: 'Campo requerido',
  email:'El correo no es válido',
  minlength: 'El campo debe contener más de 4 caracteres',
  passwordMismatch: 'Las contraseñas no coinciden',
  specialCharacters: 'Este campo posee caracteres no permitidos',
  textOnNumberField: 'Este campo solo acepta números',
  socialReason: 'La razón social posee caracteres no permitidos'
};

export const customEmailValidator = (control: AbstractControl): { [key: string]: boolean } | null =>
(emailRegex.test(control.value)) ? null : { email:true };


export const customAdminEmailValidator = (control: AbstractControl): { [key: string]: boolean } | null =>
emailRegex.test(control.value) || control.value === 'admin@admin' ? null : { email:true };

export const specialCharactersValidator = (control: AbstractControl): { [key: string]: boolean } | null =>
control.value === null ? { specialCharacters:true } : (specialCharactersRegex.test(control.value) || control.value.trim().length === 0) ?
{ specialCharacters:true }: null;

export const onlyNumbersValidator = (control: AbstractControl): { [key: string]: boolean } | null =>
onlyNumbersRegex.test(control.value) ? null : { textOnNumberField:true };

export const socialReasonValidator = (control: AbstractControl): { [key: string]: boolean } | null =>
control.value === null ? { socialReason:true } : (socialReasonRegex.test(control.value) || control.value.trim().length === 0) ?
{ socialReason:true }: null;

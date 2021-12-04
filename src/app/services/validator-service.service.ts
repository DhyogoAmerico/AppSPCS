import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  static verifyEmail(control: FormControl) : {  [key: string] : boolean } | null {
    let regex = new RegExp(/^[_a-z0-9-]{4,64}(\.[_a-z0-9-]+)*@[a-z0-9-]{4,250}(\.[a-z0-9-]+)?.(\.?[a-z]{2,3})$/);
    if(!regex.test(control.value) && (control.touched || control.dirty)){
      return { invalidEmail : true };
    }
    else {
      return null;
    }
  }
  
  static verifyPassword(control: FormControl) : {  [key: string] : boolean } | null {
    let regex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&():;<>,.?/~_+-=|]).{8,32}$/);
    if(!regex.test(control.value) && (control.touched || control.dirty)){
      return { invalidPassword : true };
    }
    else {
      return null;
    }
  }
}

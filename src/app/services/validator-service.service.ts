import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  // static verifyEmail(control: FormControl) : Observable<ValidationErrors | AbstractControl | any> {
  //   let regex = new RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)?.(\.[a-z]{2,3})$/);
  //   console.log(regex.test(control.value))
  //   if(!regex.test(control.value)){
  //     return { 'invalidEmail' : true };
  //   }
  //   else {
  //     return null;
  //   }
  // }
}

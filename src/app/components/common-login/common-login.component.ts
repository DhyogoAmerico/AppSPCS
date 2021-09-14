import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'common-login-component',
  templateUrl: './common-login.component.html',
  styleUrls: ['./common-login.component.less']
})
export class CommonLoginComponent implements OnInit {

  public typePassword = false;
  public formLogin = new FormGroup ({
    email_use: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    password: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    )
  });
  constructor(
    private route: Router,
    private cookieService: CookieService
  ) { }


  ngOnInit() {
  }

  submitLogin() {
    console.log(this.formLogin.value);
    this.route.navigate(['/dashboard'])
  }

  alterTypePassword() {
    if(this.typePassword){
      //password
      this.typePassword = false;
    }
    else {
      //text
      this.typePassword = true;
      setTimeout(() => {
        this.typePassword = false;
      }, 500);
    }
  }

  // testeCookie(){
  //   let dateTeste = new Date();
  //   dateTeste.setMinutes(dateTeste.getMinutes() + 30);//mais 30minutos
  //   console.log(dateTeste);
  //   this.cookieService.set('teste','teste',2);
  // }

}

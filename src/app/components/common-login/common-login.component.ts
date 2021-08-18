import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';

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
    private route: Router
  ) { }


  ngOnInit() {
  }

  submitLogin() {
    console.log(this.formLogin.value);
    this.route.navigate(['/dashboard'])
  }

  alterTypePassword() {
    this.typePassword = this.typePassword ? false : true;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'common-login-component',
  templateUrl: './common-login.component.html',
  styleUrls: ['./common-login.component.less']
})
export class CommonLoginComponent implements OnInit {

  public formLogin = new FormGroup ({
    email_use: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    password: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    )
  });
  constructor() { }


  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { ToastService } from 'src/app/services/common-service/toast.service';
import { SharedService } from 'src/app/services/shared.service';
import { ValidatorService } from 'src/app/services/validator-service.service';


@Component({
  selector: 'common-login-component',
  templateUrl: './common-login.component.html',
  styleUrls: ['./common-login.component.less']
})
export class CommonLoginComponent extends BaseComponent implements OnInit {

  public typePassword = false;
  public formLogin = new FormGroup ({
    email: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required, ValidatorService.verifyEmail])
    ),
    senha: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required, Validators.minLength(8)])
    ),
    grantType: new FormControl (
      { value: 'password', disabled: false }
    ),

  });
  constructor(
    private route: Router,
    private sharedService:SharedService,
    private cookieService: CookieService,
    private toastService: ToastService
  ) { 
    super();
  }


  ngOnInit() {
    
  }

  alterTypePassword() {
    if(this.typePassword){
      //password
      this.typePassword = false;
    }
    else {
      //text
      this.typePassword = true;
    }
  }

  loginUser(){
    if(this.formLogin.valid){
      this.sharedService.loginUser(this.formLogin.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (response: any) => {
          this.cookieService.set('authenticatedSPCS',(response.accessToken), 30);
          this.cookieService.set('refreshSPCS',(response.refreshToken), 30);

          response.usuarioToken.claims[0] = response.usuarioToken.claims.find( x => x.type.includes('Administrador' || 'Medico' || 'Enfermeiro') )
          
          switch (response.usuarioToken.claims[0].type) {
            case 'Medico':
              this.cookieService.set('typeUserSPCS','7DBE420C-2297-411C-B9FA-AA97D49E2A53', 30);
              break;
            case 'Enfermeiro':
              this.cookieService.set('typeUserSPCS','7D277147-A892-4312-A845-B5CA5A27BED6', 30);
              break;
            case 'Administrador':
              this.cookieService.set('typeUserSPCS','D44B63A1-80D9-41E1-994A-D9C1C4D308E7', 30);
              break;
            default:
              this.toastService.addToast('warn', 'Erro', 'Erro no tipo de usuario');
              break;
          }
          this.route.navigate(["/dashboard"]);
        }
      );
    }
  }
}

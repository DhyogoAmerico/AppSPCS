import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from './common-service/common.service';
import { ToastService } from './common-service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private commonService: CommonService,
    private toastService: ToastService,
    private route: Router
  ) {}
canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.cookieService.check('authenticatedSPCS') && this.cookieService.check('refreshSPCS')){
      this.commonService.refreshToken().subscribe(
        (response: any) => {
          console.log(response);
          this.cookieService.deleteAll();
          this.cookieService.set('authenticatedSPCS',response.accessToken, 30);
          this.cookieService.set('refreshSPCS',(response.refreshToken), 30);
          
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
      )
    }
    else {
      return true;
    }
    return true;
  }
  
}

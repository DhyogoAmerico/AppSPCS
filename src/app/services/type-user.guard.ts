import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute, RoutesRecognized, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from './common-service/common.service';
import { ToastService } from './common-service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class TypeUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private commonService: CommonService,
    private toastService: ToastService
  ) { 
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let typeUser = this.commonService.getTypeUser();
    let dataType: any= route.data['typeUser'] as Array<string>;

    if (dataType[0] === '*') {
      return true;
    }

    if(dataType.includes(typeUser)){
      return true;
    }
    else {
      this.toastService.addToast('info','Não autorizado!','Você não está autorizado a navegar nesta página');
      this.router.navigate(['/dashboard'])
    }

    
  }

}

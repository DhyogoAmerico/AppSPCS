import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.checkAuth(state.url);
  }
  
  checkAuth(url){
    try {
      if(this.cookieService.check("authenticatedSPCS")){
        return true;
      }
      else {
        this.router.navigate(["/login"]);
        return true
      }
    } catch (error) {
      this.router.navigate(["/login"]);
      return false;
    }
    
    return false;

  }
}

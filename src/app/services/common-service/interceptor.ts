import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable()
export class Interceptor implements HttpInterceptor { 
  
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _router: Router,
    private toastService: ToastService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(isPlatformServer(this._platformId)){
      return next.handle(request);
    }

    return next.handle(request).pipe(catchError(
      (err) => {
        if (err.status === 401) {
          console.log(err);
          this.toastService.addToast('error','Erro 401','Você não está autorizado a executar essa ação.');
          this._router.navigate(['/login']);
        }
        else {
          if(err.status !== 200) {
            console.info(err.error.errors)
            this.toastService.addToast('error',err.status,err.error.errors.Mensagens);
          }
        }

        return throwError(err);
      }
    ) as any);
  }
}

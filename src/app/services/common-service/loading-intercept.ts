import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/timer';

import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from './base-component/base-component.component';
import { EventEmitterService } from './eventEmitterService';
import { ToastService } from './toast.service';
import { Route, Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';


@Injectable()
export class LoadingIntercept extends BaseComponent implements HttpInterceptor {

    private count = 0;
    private timerLoading = 400;
    private timer: Observable<any>;
    private timerSubscribe = new Subscription;

    constructor(
        @Inject(PLATFORM_ID) private _platformId: Object,
        private toastService: ToastService,
        private _router: Router
    ) { super(); }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.count++;

        if (this.count === 1) {
            EventEmitterService.get('eventLoading').emit(true);
            this.limitTimer(120);
        }

        if(isPlatformServer(this._platformId)){
            return next.handle(request);
          }

        return next.handle(request)
            .do(evt => {
                if (evt instanceof HttpResponse) {
                }
            })
            .pipe(catchError((err: any) => {
                // tslint:disable-next-line: deprecation
                switch (err.status) {
                    case 401:
                      this.toastService.addToast('error','Erro 401','Você não está autorizado a executar essa ação.');
                      this._router.navigate(['/login']);
                      break;
                    case 500:
                      this.toastService.addToast('error','Erro 500','API.');
                      break;
                    case 200:
                      break;
                    default:
                      this.toastService.addToast('error',err.status,err.error.errors.Mensagens || err.error.errors.title);
                      break;
                  }
                  return throwError(err);
            })).finally(() => {
                this.count--;
                if (this.count === 0) {
                    setTimeout(() => {
                        EventEmitterService.get('eventLoading').emit(false);
                        this.timerSubscribe.unsubscribe();
                    }, this.timerLoading);
                }
            })

    }

    limitTimer(limit) {
        this.timerSubscribe.unsubscribe();

        this.timer = Observable.timer(2000, 1000);
        this.timerSubscribe = this.timer.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            tick => {
                if (tick >= limit) {
                    setTimeout(() => {
                        EventEmitterService.get('eventLoading').emit(false);
                        this.timerSubscribe.unsubscribe();
                    }, this.timerLoading);
                }
            }
        );
    }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/timer';

import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from './base-component/base-component.component';
import { EventEmitterService } from './eventEmitterService';


@Injectable()
export class LoadingIntercept extends BaseComponent implements HttpInterceptor {

    private count = 0;
    private timerLoading = 400;
    private timer: Observable<any>;
    private timerSubscribe = new Subscription;

    constructor() { super(); }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.count++;

        if (this.count === 1) {
            EventEmitterService.get('eventLoading').emit(true);
            this.limitTimer(120);
        }

        return next.handle(req)
            .do(evt => {
                if (evt instanceof HttpResponse) {
                }
            })
            .catch((err: any) => {
                // tslint:disable-next-line: deprecation
                return Observable.throw(err);
            }).finally(() => {
                this.count--;
                if (this.count === 0) {
                    setTimeout(() => {
                        EventEmitterService.get('eventLoading').emit(false);
                        this.timerSubscribe.unsubscribe();
                    }, this.timerLoading);
                }
            });

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

import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { EventEmitterService } from 'src/app/services/common-service/eventEmitterService';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent extends BaseComponent implements OnInit {
  public loading = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,

  ) { super(); }

  ngOnInit() {
    const _self = this;
    EventEmitterService.get('eventLoading').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      action => {
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            _self.loading = action;
          });
        }
      }
    );
  }
}

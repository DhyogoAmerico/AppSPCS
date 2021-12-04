import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { breadcrumb } from 'src/app/services/common-service/common.service';
import { EventEmitterService } from 'src/app/services/common-service/eventEmitterService';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less']
})
export class BreadcrumbsComponent extends BaseComponent implements OnInit {

  public objBreadcrumb: any[];
  public objBread: any[];
  public teste:any;
  public subscription = new Subscription
  constructor() { 
    super();
  }
  
  ngOnInit() {
    this.subscription =  EventEmitterService.get('breadcrumb').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      breadcrumb => {
        console.log(breadcrumb)
        this.objBreadcrumb = breadcrumb
        this.objBread = []
        setTimeout(() => {
          this.objBreadcrumb.forEach(element => {
            this.objBread.push({
              title: element.title,
              url: element.url
            })
          });
        }, 500);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
}

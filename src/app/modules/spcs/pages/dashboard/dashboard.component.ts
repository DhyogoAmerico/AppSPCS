import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { CommonService } from 'src/app/services/common-service/common.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'] 
})
export class DashboardComponent extends BaseComponent implements OnInit {

  public innerWidth = window.innerWidth;
  constructor(
    private sharedService: SharedService,
    private commonService: CommonService
  ) {
    super();
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit() {
    // this.sharedService.getAllUsers().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //   }
    // );
  }

  

}

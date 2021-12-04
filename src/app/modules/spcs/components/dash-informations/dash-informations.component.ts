import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dash-informations',
  templateUrl: './dash-informations.component.html',
  styleUrls: ['./dash-informations.component.less']
})
export class DashInformationsComponent extends BaseComponent implements OnInit {

  public quantPacientes: any;
  constructor(
    private sharedService: SharedService
  ) { 
    super();
  }

  ngOnInit() {
    this.QuantPaciente();
  }

  QuantPaciente(){
    this.sharedService.QuantPacientes().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any) => {
        this.quantPacientes = response;
      }
    )
  }

}

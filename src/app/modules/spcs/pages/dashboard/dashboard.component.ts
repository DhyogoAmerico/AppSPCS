import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'] 
})
export class DashboardComponent implements OnInit {

  public teste = true;
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  

}

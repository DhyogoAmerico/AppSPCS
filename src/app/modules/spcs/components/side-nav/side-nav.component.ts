import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less']
})
export class SideNavComponent implements OnInit {
  
  public displaySide = true;
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Mensagem Teste', detail:'Order submitted'});
  }
}

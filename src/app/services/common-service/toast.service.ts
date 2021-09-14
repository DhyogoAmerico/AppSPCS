import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private messageService: MessageService
  ) { }

  addToast(type = '',title = '',desc = ''){
    //types: success / info / warn / error

    this.messageService.add({severity: type, summary: title, detail: desc})

  }
}

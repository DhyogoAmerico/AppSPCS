import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less']
})
export class SideNavComponent implements OnInit {
  
  public displaySide = true;
  public listSide : any[];
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.mountSide();
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Mensagem Teste', detail:'Order submitted'});
  }

  mountSide(){
    this.mountSideMaster(); 
  }

  mountSideMedico() {
    this.listSide = [
      {
        icon: 'fas fa-tachometer-alt', label:'Painel', link: '/dashboard'
      },
      {
        icon: 'fas fa-hospital-user', label:'Pacientes', link: '/dashboard/pacientes'
      },
      {
        icon: 'fas fa-stethoscope', label:'Diagnósticos', link: '/dashboard/report-diagnostico'
      }
    ]
  }

  mountSideEndermeira() {
    this.listSide = [
      {
        icon: 'fas fa-tachometer-alt', label:'Painel', link: '/dashboard'
      },
      {
        icon: 'fas fa-hospital-user', label:'Pacientes', link: '/dashboard/pacientes'
      }
    ]
  }

  mountSideAdmin() {
    this.listSide = [
      {
        icon: 'fas fa-tachometer-alt', label:'Painel', link: '/dashboard'
      },
      {
        icon: 'fas fa-users-cog', label:'Usuário', link: '/dashboard/usuarios'
      },
      {
        icon: 'fas fa-cogs', label:'Configuração', link: '/dashboard/settings'
      }
    ]
  }

  mountSidePaciente() {
    this.listSide = [
      {
        icon: 'fas fa-tachometer-alt', label:'Painel', link: '/dashboard'
      },
      {
        icon: 'fas fa-stethoscope', label:'Diagnóstico', link: '/dashboard/report-diagnostico'
      }
    ]
  }

  mountSideMaster() {
    this.listSide = [
      {
        icon: 'fas fa-tachometer-alt', label:'Painel', link: '/dashboard'
      },
      {
        icon: 'fas fa-hospital-user', label:'Pacientes', link: '/dashboard/pacientes'
      },
      {
        icon: 'fas fa-stethoscope', label:'Diagnósticos', link: '/dashboard/report-diagnostico'
      },
      {
        icon: 'fas fa-hospital-user', label:'Pacientes', link: '/dashboard/pacientes'
      },
      {
        icon: 'fas fa-users-cog', label:'Usuário', link: '/dashboard/usuarios'
      },
      {
        icon: 'fas fa-cogs', label:'Configuração', link: '/dashboard/settings'
      },
      {
        icon: 'fas fa-stethoscope', label:'Diagnóstico', link: '/dashboard/report-diagnostico'
      }
    ]
  }
}

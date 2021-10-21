import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { CommonService } from 'src/app/services/common-service/common.service';
import { ToastService } from 'src/app/services/common-service/toast.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less']
})
export class SideNavComponent implements OnInit {
  
  public displaySide = true;
  public listSide : any[];
  public typeUser = '';
  constructor(
    private toastService: ToastService,
    private commonService: CommonService,
    private router:Router,

  ) { }

  ngOnInit() {
    this.typeUser = this.commonService.getTypeUser();
    this.mountSide();
  }

  mountSide(){
    switch (this.typeUser) {
      case 'medico':
        this.mountSideMedico();
        break;
      case 'enfermeiro':
        this.mountSideEndermeira();
        break;
      case 'admin':
        this.mountSideAdmin();
        break;
      default:
        this.router.navigate(['/login']);
        this.toastService.addToast('error','Não Autorizado','Você não está autorizado');
        break;
    }
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
        icon: 'fas fa-users-cog', label:'Enfermeiros', link: '/dashboard/enfermeiros'
      },
      {
        icon: 'fas fa-stethoscope', label:'Diagnósticos', link: '/dashboard/diagnosticos'
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
        icon: 'fas fa-hospital-user', label:'Pacientes', link: '/dashboard/pacientes'
      },
      {
        icon: 'fas fa-users-cog', label:'Enfermeiros', link: '/dashboard/enfermeiros'
      },
      {
        icon: 'fas fa-users-cog', label:'Médicos', link: '/dashboard/medicos'
      },
      {
        icon: 'fas fa-stethoscope', label:'Diagnósticos', link: '/dashboard/diagnosticos'
      },
      {
        icon: 'fas fa-stethoscope', label:'Ficha', link: '/dashboard/fichas'
      },
      {
        icon: 'fas fa-cogs', label:'Agrotóxico', link: '/dashboard/agrotoxicos'
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

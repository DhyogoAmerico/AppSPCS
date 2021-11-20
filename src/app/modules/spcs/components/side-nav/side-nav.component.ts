import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  public listSide: any[];
  public innerWidth: number;
  public closeSide = false;
  public typeUser = '';
  constructor(
    private toastService: ToastService,
    private cookieService: CookieService,
    private commonService: CommonService,
    private router: Router,
  ) {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 700){
      this.closeSide = true;
    }
  }

  ngOnInit() {
    this.typeUser = this.commonService.getTypeUser();
    this.mountSide();
  }

  mountSide() {
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
        this.toastService.addToast('error', 'Não Autorizado', 'Você não está autorizado');
        break;
    }
  }

  mountSideMedico() {
    this.listSide = [
      {
        icon: 'fas fa-tachometer-alt', label: 'Painel', link: '/dashboard'
      },
      {
        icon: 'fas fa-hospital-user', label: 'Pacientes', link: '/dashboard/pacientes'
      },
      {
        icon: 'fas fa-user-nurse', label: 'Enfermeiros', link: '/dashboard/enfermeiros'
      },
      {
        icon: 'far fa-file-medical', label: 'Ficha', link: '/dashboard/fichas'
      }
    ]
  }

  mountSideEndermeira() {
    this.listSide = [
      {
        icon: 'fas fa-tachometer-alt', label: 'Painel', link: '/dashboard'
      },
      {
        icon: 'fas fa-hospital-user', label: 'Pacientes', link: '/dashboard/pacientes'
      }
    ]
  }

  mountSideAdmin() {
    this.listSide = [
      {
        icon: 'fas fa-tachometer-alt', label: 'Painel', link: '/dashboard'
      },
      {
        icon: 'fas fa-hospital-user', label: 'Pacientes', link: '/dashboard/pacientes'
      },
      {
        icon: 'fas fa-user-nurse', label: 'Enfermeiros', link: '/dashboard/enfermeiros'
      },
      {
        icon: 'fas fa-user-md', label: 'Médicos', link: '/dashboard/medicos'
      },
      {
        icon: 'far fa-file-medical', label: 'Ficha', link: '/dashboard/fichas'
      },
      {
        icon: 'far fa-file-medical-alt', label: 'Diagnósticos', link: '/dashboard/diagnosticos'
      },
      {
        icon: 'fas fa-seedling', label: 'Agrotóxico', link: '/dashboard/agrotoxicos'
      }
    ]
  }

  mountSidePaciente() {
    this.listSide = [
      {
        icon: 'fas fa-tachometer-alt', label: 'Painel', link: '/dashboard'
      },
      {
        icon: 'fas fa-stethoscope', label: 'Diagnóstico', link: '/dashboard/report-diagnostico'
      }
    ]
  }

  logoutUser() {
    if (this.cookieService.get('authenticatedSPCS')) {
      this.cookieService.deleteAll('/');
      this.router.navigate(["/login"]);
    }
  }
}

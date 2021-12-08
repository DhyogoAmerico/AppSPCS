import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { breadcrumb, CommonService } from 'src/app/services/common-service/common.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.less']
})
export class AdminDashComponent implements OnInit {

  public listBtnDash: any[];
  constructor(
    private commomService: CommonService
  ) { }

  ngOnInit() {
    this.mountDash();
    this.mountBreadcrumb();
  }

  mountBreadcrumb(){
    let objBreadcrumb: breadcrumb[];
    objBreadcrumb = [
      {
        title: 'Painel',
        url: 'dashboard'
      }
    ]
    this.commomService.emitBreadcrumb(objBreadcrumb);
  }

  mountDash() {
    this.listBtnDash = [];
    let typeUser = this.commomService.getTypeUser();
    switch (typeUser) {
      case 'medico':
        this.listBtnDash = [
          { icon: 'fas fa-user-plus', label: 'Pacientes', link: 'pacientes'},
          { icon: 'fas fa-user-md', label: 'Medicos', link: 'medicos'},
          { icon: 'fas fa-user-nurse', label: 'Enfermeiros', link: 'enfermeiros'},
          { icon: 'fas fa-file-signature', label: 'Ficha', link: 'fichas'},
          { icon: 'fas fa-file-invoice', label: 'Diagnóstico', link: 'diagnosticos'},
          { icon: 'fas fa-seedling', label: 'Agrotóxicos', link: 'agrotoxicos'}
        ]
        break;
      case 'enfermeiro':
        this.listBtnDash = [
          { icon: 'fas fa-user-plus', label: 'Pacientes', link: 'pacientes'},
          { icon: 'fas fa-file-signature', label: 'Ficha', link: 'fichas'},
          { icon: 'fas fa-seedling', label: 'Agrotóxicos', link: 'agrotoxicos'}
        ]
        break;
      case 'admin':
        this.listBtnDash = [
          { icon: 'fas fa-user-plus', label: 'Pacientes', link: 'pacientes'},
          { icon: 'fas fa-user-md', label: 'Medicos', link: 'medicos'},
          { icon: 'fas fa-user-nurse', label: 'Enfermeiros', link: 'enfermeiros'},
          { icon: 'fas fa-file-signature', label: 'Ficha', link: 'fichas'},
          { icon: 'fas fa-file-invoice', label: 'Diagnóstico', link: 'diagnosticos'},
          { icon: 'fas fa-seedling', label: 'Agrotóxicos', link: 'agrotoxicos'},
          { icon: 'fas fa-file-csv', label: 'Exporte Dados', link: 'export'}
        ]
        break;
      default:
        return 'false';
        break;
    }
    
  }

}

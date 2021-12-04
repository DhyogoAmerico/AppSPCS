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
    this.listBtnDash = [
      { icon: 'fas fa-user-plus', label: 'Pacientes', link: 'pacientes'},
      { icon: 'fas fa-user-md', label: 'Medicos', link: 'medicos'},
      { icon: 'fas fa-user-nurse', label: 'Enfermeiros', link: 'enfermeiros'},
      { icon: 'far fa-file-medical', label: 'Ficha', link: 'fichas'},
      { icon: 'far fa-file-medical-alt', label: 'Diagnóstico', link: 'diagnosticos'},
      { icon: 'fas fa-seedling', label: 'Agrotóxico', link: 'agrotoxicos'}
    ]
  }

}

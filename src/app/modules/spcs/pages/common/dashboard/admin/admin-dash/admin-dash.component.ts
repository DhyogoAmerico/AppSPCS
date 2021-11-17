import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.less']
})
export class AdminDashComponent implements OnInit {

  public listBtnDash: any[];
  constructor() { }

  ngOnInit() {
    this.mountDash();
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

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
      { icon: 'fas fa-user-plus', label: 'Cadastro de paciente', link: 'paciente/register', queryParam: 'paciente'}
    ]
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.less']
})
export class MedicosComponent extends BaseComponent implements OnInit {

  public infoTable: any[];
  public visibleEdit = false;
  public objUser: any;
  public responsePacientes: any;
  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { 
    super();
  }

  ngOnInit() {
    this.mountHeader();
    this.responsePacientes = [
      {
        nome: 'Medico Teste1',
        cpf: '15915915946',
        diagnostico: true,
        data_cadastro: '15/09/2021'
      },
      {
        nome: 'Medico Teste2',
        cpf: '15915915946',
        diagnostico: true,
        data_cadastro: '15/09/2021'
      },
      {
        nome: 'Medico Teste23',
        cpf: '15915915946',
        diagnostico: true,
        data_cadastro: '15/09/2021'
      },
      {
        nome: 'Medico Teste4',
        cpf: '15915915946',
        diagnostico: true,
        data_cadastro: '15/09/2021'
      },
      {
        nome: 'Medico Teste5',
        cpf: '15915915946',
        diagnostico: true,
        data_cadastro: '15/09/2021'
      }
    ]
  }

  byUrlRegister() {
    this.router.navigate(['dashboard/pacientes/register'], { queryParams : { type: 'medico'} })
  }
  
  mountHeader(){
    this.infoTable = [
      {
        header: 'Nome',
        field: 'nome'
      },
      {
        header: 'CPF',
        field: 'cpf'
      },
      {
        header: 'Diagnosticado',
        field: 'diagnostico'
      },
      {
        header: 'Cadastro',
        field: 'data_cadastro'
      }
    ]
  }

  editUser(user){
    console.log(user);
    this.objUser = null;
    this.objUser = user;
    console.log(this.objUser);
    this.visibleEdit = true;
  }

  deleteUser(user) {
    console.log(user);
  }
}

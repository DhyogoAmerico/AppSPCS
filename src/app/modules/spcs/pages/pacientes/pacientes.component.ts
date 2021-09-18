import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.less']
})
export class PacientesComponent implements OnInit {

  public infoTable: any[];
  public responsePacientes: any;
  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mountHeader();
    this.responsePacientes = [
      {
        nome: 'Paciente Teste1',
        cpf: '15915915946',
        diagnostico: true,
        data_cadastro: '15/09/2021'
      },
      {
        nome: 'Paciente Teste2',
        cpf: '15915915946',
        diagnostico: true,
        data_cadastro: '15/09/2021'
      },
      {
        nome: 'Paciente Teste23',
        cpf: '15915915946',
        diagnostico: true,
        data_cadastro: '15/09/2021'
      },
      {
        nome: 'Paciente Teste4',
        cpf: '15915915946',
        diagnostico: true,
        data_cadastro: '15/09/2021'
      },
      {
        nome: 'Paciente Teste5',
        cpf: '15915915946',
        diagnostico: true,
        data_cadastro: '15/09/2021'
      }
    ]
  }

  byUrlRegister() {
    this.router.navigate(['dashboard/pacientes/register'], { queryParams : { type: 'paciente'} })
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
  }

  deleteUser(user) {
    console.log(user);
  }

}

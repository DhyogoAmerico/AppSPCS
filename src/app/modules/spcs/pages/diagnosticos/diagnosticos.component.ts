import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.less']
})
export class DiagnosticosComponent extends BaseComponent implements OnInit {
  public valueSearch = '';
  public infoTable = []
  public responseTable : any;
  constructor(
    private router: Router
  ) { 
    super();
  }

  ngOnInit() {
  }

  registerDiagnostico(){
    this.router.navigate(['dashboard/diagnosticos/cadastro']);

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

}

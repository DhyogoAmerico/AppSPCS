import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.less']
})
export class FichaComponent extends BaseComponent implements OnInit {
  public valueSearch = '';
  public infoTable = []
  public responseTable : any;
  constructor(
    private router: Router
  ) { 
    super();
  }

  ngOnInit() {
    this.mountHeader();
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
        header: 'Ação',
        field: 'action'
      }
    ]
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.less']
})
export class DiagnosticosComponent extends BaseComponent implements OnInit {
  public valueSearch = '';
  public infoTable = []
  public responseTable : any[];
  constructor(
    private sharedService: SharedService
  ) { 
    super();
  }

  ngOnInit() {
    this.mountHeader();
    this.ListarFichas();
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
        header: 'Cadastro',
        field: 'dataCadastro'
      },
      {
        header: 'Ação',
        field: 'action',
        style: 'max-width: 80px'
      }
    ]
  }

  impressaoFicha(obj){
    console.warn(obj)
  }

  ListarFichas(){
    this.sharedService.ListarFichaPaciente().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.responseTable = response || [];
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-agrotoxicos',
  templateUrl: './agrotoxicos.component.html',
  styleUrls: ['./agrotoxicos.component.less']
})
export class AgrotoxicosComponent extends BaseComponent implements OnInit {
  public valueSearch = '';
  public infoTable = []
  public responseTable : any;
  constructor(
    private router: Router,
    private sharedService: SharedService
  ) { 
    super();
  }

  ngOnInit() {
    this.mountHeader();
    this.listarTodosAgrotoxicos();
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
        header: 'Tipo',
        field: 'tipo'
      },
      {
        header: 'Princípio Ativo',
        field: 'principioAtivo'
      },
      {
        header: 'Ação',
        field: 'action'
      }
    ]
  }

  listarTodosAgrotoxicos(){
    this.sharedService.GetAllAgrotoxico().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

}

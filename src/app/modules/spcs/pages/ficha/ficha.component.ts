import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { breadcrumb, CommonService } from 'src/app/services/common-service/common.service';
import { EventEmitterService } from 'src/app/services/common-service/eventEmitterService';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.less']
})
export class FichaComponent extends BaseComponent implements OnInit {
  public valueSearch = '';
  public infoTable = []
  public responseTable: any;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private commomService: CommonService
  ) {
    super();
  }

  ngOnInit() {
    this.mountHeader();
    this.getAllPacientes();
    this.mountBreadcrumb();
  }

  mountBreadcrumb(){
    let objBreadcrumb: breadcrumb[];
    objBreadcrumb = [
      {
        title: 'Painel',
        url: 'dashboard'
      },
      {
        title: 'Fichas',
        url: ''
      }
    ]
    this.commomService.emitBreadcrumb(objBreadcrumb);
  }

  registerDiagnostico() {
    this.router.navigate(['dashboard/diagnosticos/cadastro']);

  }

  mountHeader() {
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

  getAllPacientes() {
    this.sharedService.getAllUsers('paciente').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response) => {
        this.responseTable = response || [];
      }
    )
  }

  searchByCpf() {
    this.sharedService.findUserByCpf('paciente', this.valueSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe (
      (response) => {
        this.responseTable = response; 
      }
    )
  }

  openRegisterFicha(objUser) {
    let cpf = objUser.cpf;
    
    this.router.navigate([`dashboard/diagnosticos/cadastro/${cpf}`]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-enfermeiros',
  templateUrl: './enfermeiros.component.html',
  styleUrls: ['./enfermeiros.component.less']
})
export class EnfermeirosComponent extends BaseComponent implements OnInit {

  public infoTable: any[];
  public visibleEdit = false;
  public objUser: any;
  public searchPaciente = '';
  public listEnfermeiros: any;
  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {
    super();
   }

  ngOnInit() {
    this.mountHeader();
    this.getAllEnfermeiros();
    // this.listEnfermeiros = [
    //   {
    //     nome: 'Enfermeiro Teste1',
    //     cpf: '15915915946',
    //     diagnostico: true,
    //     data_cadastro: '15/09/2021'
    //   },
    //   {
    //     nome: 'Enfermeiro Teste2',
    //     cpf: '15915915946',
    //     diagnostico: true,
    //     data_cadastro: '15/09/2021'
    //   },
    //   {
    //     nome: 'Enfermeiro Teste23',
    //     cpf: '15915915946',
    //     diagnostico: true,
    //     data_cadastro: '15/09/2021'
    //   },
    //   {
    //     nome: 'Enfermeiro Teste4',
    //     cpf: '15915915946',
    //     diagnostico: true,
    //     data_cadastro: '15/09/2021'
    //   },
    //   {
    //     nome: 'Enfermeiro Teste5',
    //     cpf: '15915915946',
    //     diagnostico: true,
    //     data_cadastro: '15/09/2021'
    //   }
    // ]
  }

  byUrlRegister() {
    // this.router.navigate(['dashboard/usuario/register'], { queryParams : { type: 'enfermeiro'} });
    this.router.navigate(['dashboard/usuario/register/enfermeiro']);
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
        header: 'Telefone',
        field: 'telefone'
      },
      {
        header: 'Coren',
        field: 'coren'
      }
    ]
  }

  getAllEnfermeiros() {
    this.sharedService.getAllUsers('enfermeiro').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.listEnfermeiros = response || [];
      }
    )
  }

  editUser(user){
    this.objUser = null;
    this.objUser = user;
    this.visibleEdit = true;
  }

  deleteUser(user) {
    console.log(user);
  }

  searchByCpf(){
    console.log(this.searchPaciente);
    this.sharedService.findPacienteByCpf(this.searchPaciente).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.listEnfermeiros = [];
        this.listEnfermeiros.push(response);
      }
    )
  }

  limparList(){
    this.listEnfermeiros = [];
    this.getAllEnfermeiros();
  }
}

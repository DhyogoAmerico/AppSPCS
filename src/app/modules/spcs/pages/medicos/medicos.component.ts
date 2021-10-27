import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
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
  public searchMed = '';
  public responseMed: any;
  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { 
    super();
  }

  ngOnInit() {
    this.mountHeader();
    this.getAllMedicos();
  }

  byUrlRegister() {
    // this.router.navigate(['dashboard/usuario/register'], { queryParams : { type: 'medico'} })
    this.router.navigate(['dashboard/usuario/register/medico']);
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
        header: 'CRM',
        field: 'crm'
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

  searchByCpf(){
    console.log(this.searchMed);
    this.sharedService.findPacienteByCpf(this.searchMed).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.responseMed = [];
        this.responseMed.push(response);
      }
    )
  }

  limparList(){
    this.responseMed = [];
    this.getAllMedicos();
  }
  getAllMedicos() {
    this.sharedService.getAllUsers('medico').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.responseMed = response || [];
      }
    )
  }
}

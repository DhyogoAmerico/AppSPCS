import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.less']
})
export class PacientesComponent extends BaseComponent implements OnInit {

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
    this.getAllPacientes();
    this.mountHeader();
    
  }

  byUrlRegister() {
    this.router.navigate(['dashboard/pacientes/register'], { queryParams : { type: 'paciente'} })
  }

  getAllPacientes() {
    this.sharedService.getAllPacientes().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        console.log(response);
        this.responsePacientes = response || [];
      }
    )
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
        header: 'Sexo',
        field: 'sexo'
      },
      {
        header: 'Telefone',
        field: 'telefone'
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
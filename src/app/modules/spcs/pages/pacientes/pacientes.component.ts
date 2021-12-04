import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { breadcrumb, CommonService } from 'src/app/services/common-service/common.service';
import { ToastService } from 'src/app/services/common-service/toast.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.less']
})
export class PacientesComponent extends BaseComponent implements OnInit {

  public infoTable: any[];
  public visibleEdit = false;
  public objUser: any;
  public searchPaciente = "";
  public listPacientes: any;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private toastService: ToastService,
    private commomService:CommonService
  ) {
    super();
  }

  ngOnInit() {
    this.getAllPacientes();
    this.mountHeader();
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
        title: 'Pacientes',
        url: ''
      }
    ]

    this.commomService.emitBreadcrumb(objBreadcrumb);
  }

  byUrlRegister() {
    // this.router.navigate(['dashboard/usuario/register'], { queryParams : { type: 'paciente'} });
    this.router.navigate(['dashboard/usuario/register/paciente']);
  }

  getAllPacientes() {
    this.sharedService.getAllUsers('paciente').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.listPacientes = response || [];
      }
    )
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
        header: 'Sexo',
        field: 'sexo'
      },
      {
        header: 'Telefone',
        field: 'telefone'
      }
    ]
  }

  editUser(user) {
    this.objUser = user;
    console.log(user)
    console.log(this.objUser)
    this.visibleEdit = true;
  }

  deleteUser(user) {
    Swal.fire({
      title: 'Atenção!',
      text: "Você deseja mesmo enviar desativar estes dados?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#38b12d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, tenho certeza',
      cancelButtonText: 'Não',
      allowOutsideClick: false
    }).then (
      (result) => {
        if(result.isConfirmed) {
          this.sharedService.DesativeUsuario(user.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (response) => {
              this.toastService.addToast("success","Desativado","Desativado com sucesso!");
            },
            (err) => {
              this.toastService.addToast("error","Erro!","Houve algum problema ao desativar o usuário.");
            }
          )
        }
      }
    )
  }

  searchByCpf() {
    this.sharedService.findUserByCpf('paciente', this.searchPaciente).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.listPacientes = [];
        this.listPacientes.push(response);
      }
    )
  }

  limparList() {
    this.listPacientes = [];
    this.getAllPacientes();
  }
}

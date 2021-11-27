import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { ToastService } from 'src/app/services/common-service/toast.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

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
    private router: Router,
    private toastService: ToastService
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
      }
    ]
  }

  editUser(user){
    this.objUser = null;
    this.objUser = user;
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

  searchByCpf(){
    console.log(this.searchMed);
    this.sharedService.findUserByCpf('medico', this.searchMed).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
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

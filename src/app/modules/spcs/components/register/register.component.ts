import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { ToastService } from 'src/app/services/common-service/toast.service';
import { cpf } from 'cpf-cnpj-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  @Input() initial: any;
  @Input() inputTypeUser: any;
  public typeUser: any;
  public objTypeUser = {
    id: '',
    descricao: ''
  }
  public registerForm = new FormGroup ({
    nome: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required, Validators.maxLength(70)])
    ),
    email: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    cpf: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    senha: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    senhaConfirmacao: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tipoUsuario: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    coren: new FormControl (
      { value: '', disabled: false }
    ),
    crm: new FormControl (
      { value: '', disabled: false }
    )
  })
  constructor(
    private toastService: ToastService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {

    this.activateRoute.queryParams.subscribe(
      param => {
        if(param['type']){
          this.typeUser = param.type;
          switch (this.typeUser) {
            case 'paciente':
              this.objTypeUser.id = 'ff35ba72-38ac-4343-88f4-9bbda552bf59';
              this.registerForm.get('tipoUsuario').setValue(this.objTypeUser);
              this.registerForm.get('senha').disable();
              this.registerForm.get('senhaConfirmacao').disable();
              this.registerForm.get('crm').disable();
              this.registerForm.get('crm').disable();
              this.registerForm.get('email').disable();
              this.registerForm.get('coren').disable();
              this.router
              break;
            case 'medico':
              this.objTypeUser.id = '7DBE420C-2297-411C-B9FA-AA97D49E2A53';
              this.registerForm.get('tipoUsuario').setValue(this.objTypeUser);
              this.registerForm.get('coren').disable();
              break;
            case 'enfermeiro':
              this.objTypeUser.id = '7D277147-A892-4312-A845-B5CA5A27BED6';
              this.registerForm.get('tipoUsuario').setValue(this.objTypeUser);
              this.registerForm.get('crm').disable();
              break;
            default:
              this.toastService.addToast('warn','Erro','Não há um tipo de usuário');
              this.router.navigateByUrl('/dashboard');
              break;
          }
        }
        else{
          this.toastService.addToast('warn','Erro','Não há um tipo de usuário');
          this.router.navigateByUrl('/dashboard');
        }

      }
    )
  }

  onReturnAddress(event){
    
  }

  submitForm(){
    if(this.registerForm.valid){
      this.sharedService.registerUsuario(this.typeUser, this.registerForm.value).subscribe(
        (response: any) => {
          console.log(response);
        }
      );
    }
    console.log(this.registerForm.value);
  }
}

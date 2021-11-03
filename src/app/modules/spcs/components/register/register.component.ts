import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { ToastService } from 'src/app/services/common-service/toast.service';
import { cpf } from 'cpf-cnpj-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { ValidatorService } from 'src/app/services/validator-service.service';

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
  public mascaraPhone = '(00) 00000-0000';
  public listEscolaridade = [];
  public typePassword = false;
  public registerForm = new FormGroup({
    nome: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required, Validators.maxLength(70)])
    ),
    email: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required, ValidatorService.verifyEmail])
    ),
    cpf: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    endereco: new FormControl(
      { value: '', disabled: false }
    ),
    senha: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required, ValidatorService.verifyPassword])
    ),
    senhaConfirmacao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tipoUsuarioId: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    telefone: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    sexo: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    dataNascimento: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    escolaridade: new FormControl(
      { value: '', disabled: false }
    ),
    coren: new FormControl(
      { value: '', disabled: false }
    ),
    crm: new FormControl(
      { value: '', disabled: false }
    )
  })
  constructor(
    private toastService: ToastService,
    private activateRoute: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.listEscolaridade = [
      "Fundamental - Incompleto",
      "Fundamental - Completo",
      "Médio - Incompleto",
      "Médio - Completo",
      "Superior - Incompleto",
      "Superior - Completo",
      "Pós-graduação - Incompleto",
      "Pós-graduação - Completo",
      "Mestrado - Incompleto",
      "Mestrado - Completo",
      "Doutorado - Incompleto",
      "Doutorado - Completo"
    ]
    if (!this.inputTypeUser) {
      this.activateRoute.params.subscribe(
        param => {
          if (param.type) {
            this.invalidInput(param.type);
          }
          else {
            this.toastService.addToast('warn', 'Erro', 'Não há um tipo de usuário');
            this.router.navigateByUrl('/dashboard');
          }
        }
      );
    }
    else {
      this.invalidInput(this.inputTypeUser);
      console.log(this.initial);
    }
  }

  invalidInput(type) {
    this.typeUser = type;
    switch (this.typeUser) {
      case 'paciente':
        this.registerForm.get('tipoUsuarioId').setValue(this.commonService.getIdUserByTypeUser(this.typeUser));
        this.registerForm.get('senha').disable();
        this.registerForm.get('senhaConfirmacao').disable();
        this.registerForm.get('endereco').setValidators(Validators.required);
        this.registerForm.get('escolaridade').setValidators(Validators.required);
        this.registerForm.get('crm').disable();
        this.registerForm.get('crm').disable();
        this.registerForm.get('email').disable();
        this.registerForm.get('coren').disable();
        this.router
        break;
      case 'medico':
        this.registerForm.get('tipoUsuarioId').setValue(this.commonService.getIdUserByTypeUser(this.typeUser));
        this.registerForm.get('coren').disable();
        this.registerForm.get('crm').setValidators(Validators.required);
        this.registerForm.get('crm').setValue('');
        this.registerForm.get('endereco').disable();
        break;
      case 'enfermeiro':
        this.registerForm.get('tipoUsuarioId').setValue(this.commonService.getIdUserByTypeUser(this.typeUser));
        this.registerForm.get('crm').disable();
        this.registerForm.get('coren').setValidators(Validators.required);
        this.registerForm.get('coren').setValue('');
        this.registerForm.get('endereco').disable();
        break;
      default:
        this.toastService.addToast('warn', 'Erro', 'Não há um tipo de usuário');
        this.router.navigateByUrl('/dashboard');
        break;
    }
  }

  onReturnAddress(event) {
    this.registerForm.get('endereco').setValue(event);
    if (this.registerForm.valid) {
      this.submitForm();
    }
  }

  validCpf(input) {
    if (input !== '' && !cpf.isValid(input)) {
      this.registerForm.get('cpf').setErrors({ invalidCpf: true });
    }
  }

  alterTypePassword() {
    if(this.typePassword){
      //password
      this.typePassword = false;
    }
    else {
      //text
      this.typePassword = true;
    }
  }

  consoleLog() {
    console.log(this.registerForm.value);
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.sharedService.registerUsuario(this.typeUser, this.registerForm.value).subscribe(
        (response: any) => {
          console.log(response);
          this.toastService.addToast('success','Sucesso!','Usuário registrado com sucesso');
          this.router.navigate(['/dashboard/'+ this.typeUser + 's']);
        }
      );
    }
  }

  inputMaskPhone() {
    setTimeout(() => {
      switch (this.registerForm.get('telefone').value.length) {
        case 11:
          this.mascaraPhone = '(00) 00000-0000';
          break;
        case 10:
          this.mascaraPhone = '(00) 0000-0000';
          break;
      }
    }, 350);
  }

  differencePassword(){
    if(this.registerForm.get('senha').value !== this.registerForm.get('senhaConfirmacao').value){
      this.registerForm.get('senha').setErrors({ differencePassword: true });
      this.registerForm.get('senhaConfirmacao').setErrors({ differencePassword: true });
    }
    else {
      this.registerForm.get('senha').setErrors({ differencePassword: false });
      this.registerForm.get('senhaConfirmacao').setErrors({ differencePassword: false });
    }
  }
}

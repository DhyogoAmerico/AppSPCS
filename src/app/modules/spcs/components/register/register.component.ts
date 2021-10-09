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
  public registerForm = new FormGroup({
    nome: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required, Validators.maxLength(70)])
    ),
    email: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    cpf: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    endereco: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    senha: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
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
      { value: '', disabled: false }, Validators.compose([Validators.required])
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
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    if (!this.inputTypeUser) {
      this.activateRoute.queryParams.subscribe(
        param => {
          if (param['type']) {
            this.invalidInput(param['type']);
          }
          else {
            this.toastService.addToast('warn', 'Erro', 'Não há um tipo de usuário');
            this.router.navigateByUrl('/dashboard');
          }

        }
      )
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
        this.registerForm.get('tipoUsuarioId').setValue('ff35ba72-38ac-4343-88f4-9bbda552bf59');
        this.registerForm.get('senha').disable();
        this.registerForm.get('senhaConfirmacao').disable();
        this.registerForm.get('crm').disable();
        this.registerForm.get('crm').disable();
        this.registerForm.get('email').disable();
        this.registerForm.get('coren').disable();
        this.router
        break;
      case 'medico':
        this.registerForm.get('tipoUsuarioId').setValue('7DBE420C-2297-411C-B9FA-AA97D49E2A53');
        this.registerForm.get('coren').disable();
        this.registerForm.get('crm').setValidators(Validators.required);
        this.registerForm.get('crm').setValue('');
        this.registerForm.get('endereco').disable();
        break;
      case 'enfermeiro':
        this.registerForm.get('tipoUsuarioId').setValue('7D277147-A892-4312-A845-B5CA5A27BED6');
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
    console.log(this.registerForm.value);
  }

  validCpf(input){
    if(input !== '' && !cpf.isValid(input)){
      this.registerForm.get('cpf').setErrors({invalidCpf :true});
    }
  }

  consoleLog(){
    console.log(this.registerForm.value);
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.sharedService.registerUsuario(this.typeUser, this.registerForm.value).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/dashboard/pacientes']);
        }
      );
    }
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common-service/common.service';
import { ToastService } from 'src/app/services/common-service/toast.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.less']
})
export class AddAddressComponent implements OnInit {
  @Output() onReturn = new EventEmitter();
  public formAddress = new FormGroup ({
    id: new FormControl (
      { value: '', disabled: false },
    ),
    logradouro: new FormControl (
      { value: '', disabled: false },
    ),
    numero: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    complemento: new FormControl (
      { value: '', disabled: false },
    ),
    bairro: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    cep: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    cidade: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    estado: new FormControl (
      { value: '', disabled: false },
    )
  });
  constructor(
    private commonService: CommonService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  viaCep(cep){
    if(cep.length === 8) {
      this.commonService.viaCep(cep).subscribe(
        (response : any) => {
          if(response.erro) {
            this.toastService.addToast('error','Erro!','Cep Invalido!');
          }
          else {
            this.formAddress.get('cidade').setValue(response.localidade);
            this.formAddress.get('estado').setValue(response.uf);
            this.formAddress.get('complemento').setValue(response.complemento);
            this.formAddress.get('bairro').setValue(response.bairro);
            this.formAddress.get('logradouro').setValue(response.logradouro);
          }
        }
      );
    }
  }

  submitForm(){
    if(this.formAddress.valid){
      if(this.formAddress.get('id').value === ''){
        this.formAddress.get('id').disable();
      }
      this.onReturn.emit(this.formAddress.value);
    }
  }

}

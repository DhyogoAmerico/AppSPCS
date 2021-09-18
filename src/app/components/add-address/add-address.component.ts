import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/common-service/toast.service';
import { SharedService } from 'src/app/services/shared.service';

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
    municipioResidencia: new FormControl (
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    estado: new FormControl (
      { value: '', disabled: false },
    )
  });
  constructor(
    private sharedService: SharedService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  viaCep(cep){
    if(cep.length === 8) {
      this.sharedService.viaCep(cep).subscribe(
        (response : any) => {
          if(response.erro) {
            this.toastService.addToast('error','Erro!','Cep Invalido!');
          }
          else {
            this.formAddress.get('municipioResidencia').setValue(response.localidade);
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
      this.onReturn.emit(this.formAddress.value);
    }
  }

}

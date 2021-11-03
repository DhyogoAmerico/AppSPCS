import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import validator from 'cpf-cnpj-validator';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register-agrotoxico',
  templateUrl: './register-agrotoxico.component.html',
  styleUrls: ['./register-agrotoxico.component.less']
})
export class RegisterAgrotoxicoComponent extends BaseComponent implements OnInit {
  @Input() initial: any;
  @Output() onReturn = new EventEmitter();
  public formAgro = new FormGroup({
    id : new FormControl(
      { value: '', disabled: false }
    ),
    nome: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tipo: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    principioAtivo: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    )
  })
  constructor(
    private sharedService: SharedService
  ) { 
    super();
    console.warn(this.initial)
    if(this.initial){
      this.checkInitial();
    }
  }

  ngOnInit() {
    console.warn(this.initial)
    if(this.initial){
      this.checkInitial();
    }
  }
  
  checkInitial() {
    this.formAgro.patchValue(this.initial);
  }

  submitAgro(){
    this.onReturn.emit(this.formAgro.value);
  }

}

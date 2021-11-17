import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-agrotoxicos',
  templateUrl: './agrotoxicos.component.html',
  styleUrls: ['./agrotoxicos.component.less']
})
export class AgrotoxicosComponent extends BaseComponent implements OnInit {
  public valueSearch = '';
  public infoTable = []
  public responseTable: any[];
  public listPrincipioAtivo: any[];
  public listTipos: any[];
  public visibleAgro = false;
  public formAgro = new FormGroup({
    id: new FormControl(
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
    private router: Router,
    private sharedService: SharedService
  ) {
    super();
  }

  ngOnInit() {
    this.mountHeader();
    this.listarTodosAgrotoxicos();
  }

  mountHeader() {
    this.infoTable = [
      {
        header: 'Nome',
        field: 'nome'
      },
      {
        header: 'Tipo',
        field: 'tipo'
      },
      {
        header: 'Princípio Ativo',
        field: 'principioAtivo'
      },
      {
        header: 'Ação',
        field: 'action',
        style: 'width: 115px'
      }
    ];
    this.listPrincipioAtivo = [
      "Glicina Substituida",
      "Organoclorado",
      "Organofosforado",
      "Carbamato",
      "Piretroide",
      "Neonicotinoide",
      "Triazol"
    ];
    this.listTipos = [
      "Inseticidas",
      "Fungicidas",
      "Acaricidas",
      "Nematicidas",
      "Herbicidas",
      "Bactericidas",
      "Vermifugos"
    ]
  }

  listarTodosAgrotoxicos() {
    this.sharedService.GetAllAgrotoxico().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.responseTable = response ? response : [];
      }
    )
  }

  onReturnAgro(event) {
    if (event.id) {
      this.sharedService.UpdateAgrotoxico(event).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (response: any) => {
          let index = this.responseTable.findIndex(x => x.id === response.id);
          this.responseTable.splice(index, 1, response);
        }
      )
    }
    else {
      this.sharedService.InserirAgrotoxico(event).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (response) => {
          this.responseTable.push(response);
        }
      )
    }
    this.visibleAgro = false;
  }

  openInsertAgro() {
    this.formAgro.reset();
    this.visibleAgro = true;
  }

  openUpdateAgro(objUser) {
    this.formAgro.patchValue(objUser);
    this.visibleAgro = true;
  }

  submitAgro() {
    if (this.formAgro.get('id').value) {
      this.sharedService.UpdateAgrotoxico(this.formAgro.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (response: any) => {
          let index = this.responseTable.findIndex(x => x.id === response.id);
          this.responseTable.splice(index, 1, response);
        }
      )
    }
    else {
      this.sharedService.InserirAgrotoxico(this.formAgro.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (response) => {
          this.responseTable.push(response);
        }
      )
    }
    this.formAgro.reset()
    this.visibleAgro = false;
  }
}

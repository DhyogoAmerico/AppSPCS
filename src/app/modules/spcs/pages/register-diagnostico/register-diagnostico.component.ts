import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { CommonService } from 'src/app/services/common-service/common.service';
import { EventEmitterService } from 'src/app/services/common-service/eventEmitterService';
import { ToastService } from 'src/app/services/common-service/toast.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register-diagnostico',
  templateUrl: './register-diagnostico.component.html',
  styleUrls: ['./register-diagnostico.component.less']
})
export class RegisterDiagnosticoComponent extends BaseComponent implements OnInit {
  public cpfUser: any;
  public listSteps: any[];
  public dataUser: any;
  public currentStep = 0;
  public listOptRelacaoTrabalho: any[];
  public listOptFuncaoTrabalho: any[];
  public listFormaAplicacao: any[];
  public listViaExpocicao: any[];
  public listPrincipioAtivo: any[];
  public listTiposCancer: any[];
  public listAgrotoxico: any[];
  public cepTrabalho = '';
  public formDiagnostico = new FormGroup({
    pacienteId: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    municipioTrabalho: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    cep: new FormControl(
      { value: '', disabled: false },
    ),
    gestante: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tabagismo: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tabagismoAtual: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tabagismoAnterior: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    etilismo: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    etilismoAtual: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    etilismoAnterior: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    ingestaoCafe: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    cafeMlDia: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    relacaoTrabalho: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    option_relacaoTrabalho: new FormControl(
      { value: '', disabled: false }
    ),
    funcaoTrabalho: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    contatoPraguicida: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tempoContatoPraguicida: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    frequenciaContatoPraguicida: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    ultimoContatoPraguicida: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    formaAplicacao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    fichaAgros: new FormControl(
      { value: '', disabled: false },
    ),
    viaExposicao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    adoeceu: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    qtdVezesAdoeceu: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    internado: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    qtdVezesInternado: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    quandoInterndo: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tipoContato: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    equipamentoProtecao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    roupaProtecao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    botaProtecao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    luvasProtecao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    mascaraProtecao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    oculosProtecao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    protetorAuricular: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    doencaCardioVascular: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    hipertensaoArterial: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    hipotensaoArterial: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    arritmia: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    alteracaoSNervoso: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    dorCabeca: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    fraquezaMuscular: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tremedeira: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tremorMuscular: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    visãoTurvaEmbacada: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    agitacaoIrritabilidade: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    vertigensTonturas: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    formigamento: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    incoordenacaoMotora: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    aparelhoDigestorio: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    colicasDorBarriga: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    dorEstomago: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    aziaQueimacao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    nauseasEnjoo: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    vomito: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    diarreia: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    aparelhoRespiratorio: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    faltaDeAr: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    irritaçaoNasal: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    catarroEscarro: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    tosse: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    aparelhoAuditivo: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    diminuicaoAudicao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    zumbido: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    peleMucosa: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    dcSensibilizante: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    dcIrritativa: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    irritacaoOcular: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    aparelhoUrinario: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    diminuicaoUrina: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    urinaescuraSangue: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    outro: new FormControl(
      { value: '', disabled: false },
    ),
    exposicaoRaiox: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    quandodiasExposicao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    teveCancer: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    sncCancer: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    digestorioCcancer: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    respiratorioCancer: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    reprodutorCancer: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    glandularCancer: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    peleOssoSangueCancer: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    familiaCancer: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    sncCancerFamilia: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    digestorioCancerfamilia: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    respiratorioCancerfamilia: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    reprodutorCancerfamilia: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    glandularCancerfamilia: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    peleOssoSangueCancerfamilia: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    edaRegiao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    ch_t: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    ch_e: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    ch_p: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    ast: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    alt: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    y_gt: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    creatinina: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    ambulatorio: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    habitoAlimentar: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    imc: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    circunferenciaAbdominal: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    dificuldadeEngravidar: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    abortoEspontaneo: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    temFilhos: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    filhoMaFormacao: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    medicamentoContinuo: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    medicamento: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    remedioMicose: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    nomeRemedio: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    )
  });
  
  constructor(
    private commonService: CommonService,
    private activateRoute: ActivatedRoute,
    private sharedService: SharedService,
    private toastService: ToastService,
    private router: Router
  ) {
    super();
    this.mountIntensDropDown();
    if (!this.cpfUser) {

      this.activateRoute.params.subscribe(
        param => {
          if (param.cpf) {
            this.cpfUser = param.cpf;
            this.findPacienteByCpf(this.cpfUser);
          }
          else {
            this.toastService.addToast('warn', 'Erro', 'Não há um tipo de usuário');
            this.router.navigateByUrl('/dashboard');
          }
        }
      );
    }
  }

  

  ngOnInit() {
    this.listarTodosAgrotoxicos();
    this.mountItensStep();
    if(this.dataUser){
      this.checkInitial();
    }
  }
  checkInitial() {
    this.formDiagnostico.get('pacienteId').setValue(this.dataUser.id);
  }

  cpfPaciente(_cpf){
    this.cpfUser = _cpf;
  }
  
  findPacienteByCpf(_cpf){
    this.sharedService.findPacienteByCpf(_cpf).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any) => {
        this.dataUser = response;
      }
    )
  }

  mountIntensDropDown() {
    this.listOptRelacaoTrabalho = [
      'Proprietário',
      'Assalariado',
      'Meeiro/Arrendatário',
      'Volante',
      'Outro'
    ];
    this.listOptFuncaoTrabalho = [
      'Administrativa',
      'Téc. Agricola/Agrônomo',
      'Aplicador na Pecuária',
      'Puxa Mangueira',
      'Aplicador/Preparador de Calda',
      'Agricultura Familiar'
    ];
    this.listFormaAplicacao = [
      'Bomba Costal(Mochila)',
      'Mangueira',
      'Trator sem cabine',
      'Trator com cabine fechada',
      'Não Informado'
    ];
    this.listViaExpocicao = [
      'Cutânea',
      'Digestiva',
      'Respiratória',
      'Outro'
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
    this.listTiposCancer = [
      "SNC",
      "Digestório",
      "Respiratório",
      "Reprodutor",
      "Glandular",
      "Pele_Osso_Sangue",
      "Nenhum"
    ];

  }

  mountItensStep() {
    this.listSteps = [
      {
        icon: 'fas fa-map-marked-alt',
        label: 'Endereço'
      },
      {
        icon: 'fas fa-user-circle',
        label: 'Perfil'
      },
      {
        icon: 'fas fa-tools',
        label: 'Trabalho'
      },
      {
        icon: 'fas fa-viruses',
        label: 'Sintomas'
      },
      {
        icon: 'fas fa-id-badge',
        label: 'Ficha'
      },
      {
        icon: 'fas fa-search',
        label: 'Avaliação'
      }
    ]
  }

  viaCep() {
    if (this.formDiagnostico.get('cep').value.length === 8) {
      this.commonService.viaCep(this.formDiagnostico.get('cep').value).subscribe(
        (response: any) => {
          if (response.erro) {
            this.formDiagnostico.get('cep').setValue('');
          }
          else {
            this.formDiagnostico.get('municipioTrabalho').setValue(response.localidade + ' - ' + response.uf);
          }
        }
      );
    }
  }

  listarTodosAgrotoxicos(){
    this.sharedService.GetAllAgrotoxico().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.listAgrotoxico = response || [];
      }
    )
  }

  submitFicha(){
    console.log(this.formDiagnostico.value);
    console.log(this.formDiagnostico.valid);
  }
}

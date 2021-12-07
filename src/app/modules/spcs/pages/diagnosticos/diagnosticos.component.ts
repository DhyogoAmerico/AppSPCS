import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { SharedService } from 'src/app/services/shared.service';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.less']
})
export class DiagnosticosComponent extends BaseComponent implements OnInit {
  public valueSearch = '';
  public visibleAllFichas = false;
  public visiblePDF = false;
  public dataFicha: any;
  public visiblePrintOverPanel = true;
  public fichaPaciente: any;
  public infoTable = []
  public responseTable: any[];

  @ViewChild('content', { static: false }) element: ElementRef;

  constructor(
    private sharedService: SharedService,
    private readonly resolver: ComponentFactoryResolver,
  ) {
    super();
  }

  ngOnInit() {
    this.mountHeader();
    this.ListarFichas();
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
        header: 'Cadastro',
        field: 'dataCadastro'
      },
      {
        header: 'Ação',
        field: 'action',
        style: 'maxWidth: "100px"'
      }
    ]
  }

  ListarFichas() {
    this.sharedService.ListarFichaPaciente().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.responseTable = response || [];
      }
    )
  }

  impressaoFicha(objFicha) {
    this.dataFicha = objFicha;
    this.visibleAllFichas = true;
  }

  async visibleFicha(data: any) {
    const objFicha = this.dataFicha.fichas.find(x => x.dataCadastro === data);

    await this.sharedService.TrazerAmostraPacientePorId(objFicha.amostraId).pipe(takeUntil(this.ngUnsubscribe)).toPromise().then(
      (response: any) => {
        this.fichaPaciente = response;
        this.fichaPaciente.dataCadastro = objFicha.dataCadastro;
        this.visiblePDF = true;
      }
    );
  }

  async printPDF() {

    console.log(this.fichaPaciente);

    //margin: 35 em toda a pagina
    //largura max: 525

    let documento = new jsPDF('p', 'pt', 'a4');

    documento.setFont("Helvetica", 'bold');
    documento.setFontSize(15);
    documento.text("SPCS - Sistema Plantando e Colhendo Saúde", 125, 35);

    documento.addPage('a4', 'p');
    documento.setFont("Helvetica", 'bold');
    documento.setFontSize(15);
    documento.text("SPCS - Sistema Plantando e Colhendo Saúde", 125, 35);
    documento.setFillColor(133, 133, 133);
    documento.rect(35, 60, 525, 2, "F");

    // documento.addPage('a4', 'p');
    // documento.setFont("Helvetica", 'bold');
    // documento.setFontSize(15);
    // documento.text("SPCS - Sistema Plantando e Colhendo Saúde", 125, 35);
    // documento.setFillColor(133, 133, 133);
    // documento.rect(35, 60, 525, 2, "F");

    documento.setPage(1);

    documento.setFillColor(133, 133, 133);
    // documento.rect(35, 45, 98, 20, "F");
    // documento.rect(35, 75, 98, 20, "F");
    documento.rect(35, 95, 525, 2, "F");
    
    documento.rect(297, 95, 1.5, 720, "F");

    documento.setFontSize(8);
    documento.setFont("Helvetica");
    documento.setTextColor(25, 25, 25);
    documento.text("Paciente", 38, 58);
    documento.text("Data da Ficha", 38, 80);

    documento.setFontSize(9);
    var indHeight = 120;
    var indMarginLeft = 38;

    documento.text("Idade...........................................:", indMarginLeft, indHeight);
    documento.text("Sexo............................................:", indMarginLeft, indHeight += 16);
    documento.text("Gestante.....................................:", indMarginLeft, indHeight += 16);
    documento.text("Tabagismo.................................:", indMarginLeft, indHeight += 16);
    documento.text("Tabagismo Atual.......................:", indMarginLeft, indHeight += 16);
    documento.text("Tabagismo Anterior..................:", indMarginLeft, indHeight += 16);
    documento.text("Etilismo......................................:", indMarginLeft, indHeight += 16);
    documento.text("Etilismo Atual............................:", indMarginLeft, indHeight += 16);
    documento.text("Etilismo Anterior.......................:", indMarginLeft, indHeight += 16);
    documento.text("Ingestão de Café.......................:", indMarginLeft, indHeight += 16);
    documento.text("Quant. Café p/ dia.....................:", indMarginLeft, indHeight += 16);
    documento.text("Relacao de Trabalho.................:", indMarginLeft, indHeight += 16);
    documento.text("Funcao no Trabalho..................:", indMarginLeft, indHeight += 16);
    documento.text("Tem Contato com Praguicida...:", indMarginLeft, indHeight += 16);
    documento.text("Por quanto tempo tem contato.:", indMarginLeft, indHeight += 16);
    documento.text("Com qual frequência.................:", indMarginLeft, indHeight += 16);
    documento.text("Última vez que teve contato.....:", indMarginLeft, indHeight += 16);
    documento.text("Princípio Ativo...........................:", indMarginLeft, indHeight += 16);
    documento.text("Forma de Aplicacao...................:", indMarginLeft, indHeight += 16);
    documento.text("Nome Comercial.........................:", indMarginLeft, indHeight += 16);
    documento.text("Princípio Ativo 2........................:", indMarginLeft, indHeight += 16);
    documento.text("Cultura........................................:", indMarginLeft, indHeight += 16);
    documento.text("Via de Exposicao........................:", indMarginLeft, indHeight += 16);
    documento.text("Adoeceu......................................:", indMarginLeft, indHeight += 16);
    documento.text("Quantas vezes............................:", indMarginLeft, indHeight += 16);
    documento.text("Já foi internado..........................:", indMarginLeft, indHeight += 16);
    documento.text("Quantas vezes............................:", indMarginLeft, indHeight += 16);
    documento.text("Quando foi..................................:", indMarginLeft, indHeight += 16);
    documento.text("Tipo de contato..........................:", indMarginLeft, indHeight += 16);
    documento.text("EPI...............................................:", indMarginLeft, indHeight += 16);
    documento.text("Roupa de Protecao....................:", indMarginLeft, indHeight += 16);
    documento.text("Bota de Protecao.......................:", indMarginLeft, indHeight += 16);
    documento.text("Luvas de Protecao.....................:", indMarginLeft, indHeight += 16);
    documento.text("Máscara de Protecao.................:", indMarginLeft, indHeight += 16);
    documento.text("Óculos de Protecao....................:", indMarginLeft, indHeight += 16);
    documento.text("Protetor Auricular......................:", indMarginLeft, indHeight += 16);
    documento.text("Doenças Cardiovascular...........:", indMarginLeft, indHeight += 16);
    documento.text("Hipertensão Arterial..................:", indMarginLeft, indHeight += 16);
    documento.text("Hipotensão Arterial...................:", indMarginLeft, indHeight += 16);
    documento.text("Arritmia.......................................:", indMarginLeft, indHeight += 16);
    documento.text("Alteração do Sistema Nervoso.:", indMarginLeft, indHeight += 16);
    documento.text("Dor de Cabeça...........................:", indMarginLeft, indHeight += 16);
    documento.text("Fraqueza Muscular...................:", indMarginLeft,  indHeight += 16);
    documento.text("Tremedeira..................................:", indMarginLeft, indHeight += 16);

    // documento.setPage(2)
    documento.setFontSize(9);
    indHeight = 121;
    indMarginLeft = 308;
    documento.text("Tremor Muscular.......................................:", indMarginLeft, indHeight);
    documento.text("Visão Turva/Embaçada.............................:", indMarginLeft, indHeight += 16);
    documento.text("Agitacao/Irritabilidade...............................:", indMarginLeft, indHeight += 16);
    documento.text("Vertigens/Tonturas....................................:", indMarginLeft, indHeight += 16);
    documento.text("Formigamento............................................:", indMarginLeft, indHeight += 16);
    documento.text("Incoordenação Motora..............................:", indMarginLeft, indHeight += 16);
    documento.text("Aparelho Digestório..................................:", indMarginLeft, indHeight += 16);
    documento.text("Cólicas/Dor de Barriga..............................:", indMarginLeft, indHeight += 16);
    documento.text("Dor de Estômago.......................................:", indMarginLeft, indHeight += 16);
    documento.text("Azia Queimação.........................................:", indMarginLeft, indHeight += 16);
    documento.text("Náuseas/Enjoo...........................................:", indMarginLeft, indHeight += 16);
    documento.text("Vomito........................................................:", indMarginLeft, indHeight += 16);
    documento.text("Diarreia.......................................................:", indMarginLeft, indHeight += 16);
    documento.text("Aparelho Respiratório...............................:", indMarginLeft, indHeight += 16);
    documento.text("Falta de Ar..................................................:", indMarginLeft, indHeight += 16);
    documento.text("Irritação Nasal............................................:", indMarginLeft, indHeight += 16);
    documento.text("Catarro/Escarro.........................................:", indMarginLeft, indHeight += 16);
    documento.text("Tosse..........................................................:", indMarginLeft, indHeight += 16);
    documento.text("Aparelho Auditivo.....................................:", indMarginLeft, indHeight += 16);
    documento.text("Diminuição da Audição.............................:", indMarginLeft, indHeight += 16);
    documento.text("Zumbido.....................................................:", indMarginLeft, indHeight += 16);
    documento.text("Pele/Mucosa..............................................:", indMarginLeft, indHeight += 16);
    documento.text("DC-Sensibilizante......................................:", indMarginLeft, indHeight += 16);
    documento.text("DC-Irritativa...............................................:", indMarginLeft, indHeight += 16);
    documento.text("Irritação Ocular.........................................:", indMarginLeft, indHeight += 16);
    documento.text("Aparelho Urinário.....................................:", indMarginLeft, indHeight += 16);
    documento.text("Diminuição de urina..................................:", indMarginLeft, indHeight += 16);
    documento.text("Urina escura/sangue.................................:", indMarginLeft, indHeight += 16);
    documento.text("Outro..........................................................:", indMarginLeft, indHeight += 16);
    documento.text("Exposição à Raio-X..................................:", indMarginLeft, indHeight += 16);
    documento.text("Quando......................................................:", indMarginLeft, indHeight += 16);
    documento.text("Teve Câncer..............................................:", indMarginLeft, indHeight += 16);
    documento.text("SNC Câncer...............................................:", indMarginLeft, indHeight += 16);
    documento.text("Câncer Sistema Digestrório.....................:", indMarginLeft, indHeight += 16);
    documento.text("Câncer Sistema Respiratório...................:", indMarginLeft, indHeight += 16);
    documento.text("Câncer Sistema Reprodutor.....................:", indMarginLeft, indHeight += 16);
    documento.text("Câncer Glandular......................................:", indMarginLeft, indHeight += 16);
    documento.text("Câncer Pele/Osso/Sangue.......................:", indMarginLeft, indHeight += 16);
    documento.text("Câncer na Família.....................................:", indMarginLeft, indHeight += 16);
    documento.text("Câncer SNC na Familia............................:", indMarginLeft, indHeight += 16);
    documento.text("Câncer Sistema Digestrório na Familia..:", indMarginLeft, indHeight += 16);
    documento.text("Câncer Sistema Respiratório na Familia.:", indMarginLeft, indHeight += 16)
    documento.text("Câncer Sistema Reprodutor na Familia...:", indMarginLeft, indHeight += 16);
    documento.text("Câncer Glandular na Familia....................:", indMarginLeft, indHeight += 16);


    documento.setPage(2)
    documento.setFontSize(9);
    indHeight = 90;
    indMarginLeft = 38;
    documento.text("Câncer Pele/Osso/Sangue na Familia.....:", indMarginLeft, indHeight);
    documento.text("É da mesma região....................................:", indMarginLeft, indHeight += 16);
    documento.text("ch_t.............................................................:", indMarginLeft, indHeight += 16);
    documento.text("ch_e............................................................:", indMarginLeft, indHeight += 16);
    documento.text("ch_p............................................................:", indMarginLeft, indHeight += 16);
    documento.text("ast...............................................................:", indMarginLeft, indHeight += 16);
    documento.text("alt................................................................:", indMarginLeft, indHeight += 16);
    documento.text("y_gt.............................................................:", indMarginLeft, indHeight += 16);
    documento.text("Creatina......................................................:", indMarginLeft, indHeight += 16);
    documento.text("Ambulatório...............................................:", indMarginLeft, indHeight += 16);
    documento.text("Habito Alimentar.......................................:", indMarginLeft, indHeight += 16);
    documento.text("IMC.............................................................:", indMarginLeft, indHeight += 16);
    documento.text("Circunferência Abdominal........................:", indMarginLeft, indHeight += 16);
    documento.text("Dificuldade p/ Engravidar.........................:", indMarginLeft, indHeight += 16);
    documento.text("Aborto Espontâneo...................................:", indMarginLeft, indHeight += 16);
    documento.text("Tem Filhos.................................................:", indMarginLeft, indHeight += 16);
    documento.text("Filho com Má Formação...........................:", indMarginLeft, indHeight += 16);
    documento.text("Medicamento Contínuo.............................:", indMarginLeft, indHeight += 16);
    documento.text("Remédio Micose........................................:", indMarginLeft, indHeight += 16);
    documento.text("Nome do Remédio.....................................:", indMarginLeft, indHeight += 16);
    documento.text("Sigla do Diagnóstico.................................:", indMarginLeft, indHeight += 16);
    // documento.text("Preço", 38, 118);

    documento.setPage(1);
    documento.setFont("Helvetica", 'bold');
    documento.setTextColor(0, 0, 0);
    documento.setFontSize(10);
    documento.text(this.dataFicha.nome || 'teste', 120, 58);
    documento.text(this.fichaPaciente.dataCadastro || 'teste', 120, 80);

    documento.setFontSize(9);
    indHeight = 121;
    indMarginLeft = 175;
    documento.text(this.fichaPaciente.idadeDiscretizado || 'Não informado', indMarginLeft, indHeight);
    documento.text(this.fichaPaciente.sexo || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.gestante || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.tabagismo || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.tabagismoAtual || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.tabagismoAnterior || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.etilismo || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.etilismoAtual || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.etilismoAnterior || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ingestaoCafe || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.cafeMldiaDiscretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.relacaoTrabalho || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.funcaoTrabalho || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.contatoPraguicida || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.tempoContatoPraguicida || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.frequenciaContatoPraguicida || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ultimoContatoPraguicida || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.principioAtivo1 || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.formaAplicacao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.nomeComercial || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.principioAtivo2 || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.cultura || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.viaExposicao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.adoeceu || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.nVezesAdoeceu || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.internado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.nvezesInternado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.quandoInternado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.tipoContato || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.equipamentoProtecao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.roupaProtecao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.botaProtecao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.luvasProtecao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.mascaraProtecao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.oculosProtecao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.protetorAuricular || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.doencaCardioVascular || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.hipertensaoArterial || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.hipotensaoArterial || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.arritmia || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.alteracaoSNervoso || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.dorCabeca || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.fraquezaMuscular || 'Não informado', indMarginLeft,  indHeight += 16);
    documento.text(this.fichaPaciente.tremedeira || 'Não informado', indMarginLeft, indHeight += 16);


    // documento.setPage(2)
    documento.setFontSize(9);
    indHeight = 121;
    indMarginLeft = 485;
    documento.text(this.fichaPaciente.tremorMuscular || 'Não informado', indMarginLeft, indHeight);
    documento.text(this.fichaPaciente.visaoTurvaEmbacada || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.agitacaoIrritabilidade || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.vertigensTonturas || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.formigamento || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.incoordenacaoMotora || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.aparelhoDigestorio || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.colicasDorBarriga || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.dorEstomago || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.aziaQueimacao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.nauseasEnjoo || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.vomito || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.diarreia || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.aparelhoRespiratorio || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.faltaDeAr || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.irritaçaoNasal || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.catarroEscarro || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.tosse || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.aparelhoAuditivo || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.diminuicaoAudicao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.zumbido || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.peleMucosa || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.dcSensibilizante || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.dcIrritativa || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.irritacaoOcular || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.aparelhoUrinario || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.diminuicaoUrina || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.urinaescuraSangue || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.outro || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.exposicaoRaiox || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.quandodiasExposicao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.teveCancer || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.sncCancer || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.digestorioCancer || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.respiratorioCancer || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.reprodutorCancer || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.glandularCancer || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.peleOssoSangueCancer || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.familiaCancer || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.sncCancerFamilia || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.digestorioCancerfamilia || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.respiratorioCancerfamilia || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.reprodutorCancerfamilia || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.glandularCancerfamilia || 'Não informado', indMarginLeft, indHeight += 16);


    documento.setPage(2)
    documento.setFontSize(9);
    indHeight = 90;
    indMarginLeft = 215;
    documento.text(this.fichaPaciente.peleOssoSangueCancerfamilia || 'Não informado', indMarginLeft, indHeight);
    documento.text(this.fichaPaciente.edaRegiao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ch_t_discretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ch_e_discretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ch_p_discretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ast_discretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.alt_discretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.y_gt_discretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.creatininaDiscretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ambulatorio || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.habitoAlimentarDiscretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.imcDiscretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.circunferenciaAbdominalDiscretizado || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.dificuldadeEngravidar || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.abortoEspontaneo || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.temFilhos || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.filhoMaFormacao || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.medicamentoContinuo || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.remedioMicose || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.nomeRemedio || 'Não informado', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.siglaDiagnostico || 'Não informado', indMarginLeft, indHeight += 16);

    const dateString = new Date(this.fichaPaciente.dataCadastro).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    documento.save(`${this.dataFicha.nome} - ${dateString}.pdf`);

    this.fichaPaciente = null;
    this.visiblePDF = false;
    this.visibleAllFichas = false;
  }

}

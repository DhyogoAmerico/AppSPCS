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
  public visiblePDF = false;
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
        style: 'max-width: 80px'
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

  printPDF() {
    var data = document.getElementById('content');
    let doc = new jsPDF('p', 'pt', 'a4');
    doc.html(
      data, {
      callback: (pdf) => {
        pdf.save("teste.pdf");
      }
    }
    )
  }

  async impressaoFicha(obj: any) {
    await this.sharedService.ListarFichaPacientePorId(obj.fichas[0].id).pipe(takeUntil(this.ngUnsubscribe)).toPromise().then(
      (response: any) => {
        this.fichaPaciente = response;
      }
    );

    console.log(this.fichaPaciente);

    //margin: 35 em toda a pagina
    //largura max: 525

    let documento = new jsPDF('p', 'pt', 'a4');
    
    documento.setFont("Helvetica", 'bold');
    documento.setFontSize(15);
    documento.text("SPCS - Sistema Plantando e Colhendo Saúde", 125, 35);

    documento.setFillColor(133, 133, 133);
    // documento.rect(35, 45, 98, 20, "F");
    // documento.rect(35, 75, 98, 20, "F");
    documento.rect(35, 95, 525, 2, "F");

    // documento.rect(35, 119, 98, 16, "F");
    // documento.rect(35, 140, 98, 16, "F");
    // documento.rect(35, 161, 98, 16, "F");
    // documento.rect(35, 182, 98, 16, "F");
    // documento.rect(35, 203, 98, 16, "F");
    // documento.rect(35, 224, 98, 16, "F");
    // documento.rect(35, 245, 98, 16, "F");
    // documento.rect(35, 266, 98, 16, "F");
    // documento.rect(35, 287, 98, 16, "F");
    // documento.rect(35, 308, 98, 16, "F");
    // documento.rect(35, 266, 98, 16, "F");
    // documento.rect(35, 287, 98, 16, "F");
    // documento.rect(35, 308, 98, 16, "F");
    // documento.rect(35, 329, 98, 16, "F");
    // documento.rect(35, 350, 98, 16, "F");
    // documento.rect(35, 371, 98, 16, "F");
    // documento.rect(35, 392, 98, 16, "F");
    // documento.rect(35, 413, 98, 16, "F");
    // documento.rect(35, 434, 98, 16, "F");
    // documento.rect(35, 455, 98, 16, "F");
    // documento.rect(35, 476, 98, 16, "F");
    // documento.rect(35, 497, 98, 16, "F");
    // documento.rect(35, 518, 98, 16, "F");
    // documento.rect(35, 539, 98, 16, "F");
    // documento.rect(35, 560, 98, 16, "F");
    // documento.rect(35, 581, 98, 16, "F");
    // documento.rect(35, 602, 98, 16, "F");
    // documento.rect(35, 623, 98, 16, "F");
    // documento.rect(35, 644, 98, 16, "F");
    // documento.rect(35, 665, 98, 16, "F");
    // documento.rect(35, 686, 98, 16, "F");
    // documento.rect(35, 707, 98, 16, "F");
    // documento.rect(35, 105, 98, 20, "FD");
    // documento.rect(40, 28, 160, 8, "s");
    // documento.rect(40, 36, 160, 8, "s");

    documento.setFontSize(8);
    documento.setFont("Helvetica");
    documento.setTextColor(25, 25, 25);
    documento.text("Paciente", 38, 58);
    documento.text("Data da Ficha", 38, 80);

    documento.setFontSize(9);
    var indHeight = 120;
    var indMarginLeft = 38;
    documento.text("abortoEspontaneo", indMarginLeft, indHeight);
    documento.text("adoeceu", indMarginLeft, indHeight += 16);
    documento.text("agitacaoIrritabilidade", indMarginLeft, indHeight += 16);
    documento.text("agrotoxicos", indMarginLeft, indHeight += 16);
    documento.text("alt", indMarginLeft, indHeight += 16);
    documento.text("alteracaoSNervoso", indMarginLeft, indHeight += 16);
    documento.text("ambulatorio", indMarginLeft, indHeight += 16);
    documento.text("aparelhoAuditivo", indMarginLeft, indHeight += 16);
    documento.text("aparelhoDigestorio", indMarginLeft, indHeight += 16);
    documento.text("aparelhoRespiratorio", indMarginLeft, indHeight += 16);
    documento.text("aparelhoUrinario", indMarginLeft, indHeight += 16);
    documento.text("arritmia", indMarginLeft, indHeight += 16);
    documento.text("ast", indMarginLeft, indHeight += 16);
    documento.text("aziaQueimacao", indMarginLeft, indHeight += 16);
    documento.text("botaProtecao", indMarginLeft, indHeight += 16);
    documento.text("cafeMlDia", indMarginLeft, indHeight += 16);
    documento.text("catarroEscarro", indMarginLeft, indHeight += 16);
    documento.text("ch_e", indMarginLeft, indHeight += 16);
    documento.text("ch_p", indMarginLeft, indHeight += 16);
    documento.text("ch_t", indMarginLeft, indHeight += 16);
    documento.text("circunferenciaAbdominal", indMarginLeft, indHeight += 16);
    documento.text("colicasDorBarriga", indMarginLeft, indHeight += 16);
    documento.text("contatoPraguicida", indMarginLeft, indHeight += 16);
    documento.text("creatinina", indMarginLeft, indHeight += 16);
    documento.text("cultura", indMarginLeft, indHeight += 16);
    documento.text("dcIrritativa", indMarginLeft, indHeight += 16);
    documento.text("dcSensibilizante", indMarginLeft, indHeight += 16);
    documento.text("diarreia", indMarginLeft, indHeight += 16);
    documento.text("dificuldadeEngravidar", indMarginLeft, indHeight += 16);
    documento.text("digestorioCancer", indMarginLeft, indHeight += 16);
    documento.text("digestorioCancerfamilia", indMarginLeft, indHeight += 16);
    documento.text("diminuicaoAudicao", indMarginLeft, indHeight += 16);
    documento.text("diminuicaoUrina", indMarginLeft, indHeight += 16);
    documento.text("doencaCardioVascular", indMarginLeft, indHeight += 16);
    documento.text("dorCabeca", indMarginLeft, indHeight += 16);
    documento.text("dorEstomago", indMarginLeft, indHeight += 16);
    documento.text("edaRegiao", indMarginLeft, indHeight += 16);
    documento.text("equipamentoProtecao", indMarginLeft, indHeight += 16);
    documento.text("etilismo", indMarginLeft, indHeight += 16);
    documento.text("etilismoAnterior", indMarginLeft, indHeight += 16);
    documento.text("etilismoAtual", indMarginLeft, indHeight += 16);
    documento.text("exposicaoRaiox", indMarginLeft, indHeight += 16);
    documento.text("faltaDeAr", indMarginLeft, indHeight += 16);
    documento.text("familiaCancer", indMarginLeft, indHeight += 16);
    documento.text("filhoMaFormacao", indMarginLeft, indHeight += 16);
    documento.text("formaAplicacao", indMarginLeft, indHeight += 16);
    documento.text("formigamento", indMarginLeft, indHeight += 16);
    documento.text("fraquezaMuscular", indMarginLeft, indHeight += 16);
    documento.text("frequenciaContatoPraguicida", indMarginLeft, indHeight += 16);
    documento.text("funcaoTrabalho", indMarginLeft, indHeight += 16);
    documento.text("gestante", indMarginLeft, indHeight += 16);
    // documento.text("Preço", 38, 118);

    documento.setFont("Helvetica", 'bold');
    documento.setTextColor(0, 0, 0);
    documento.setFontSize(10);
    documento.text(obj.nome || 'teste', 120, 58);
    documento.text(obj.fichas[0].dataCadastro || 'teste', 120, 80);

    documento.setFontSize(9);
    indHeight = 121;
    indMarginLeft = 163;
    documento.text(this.fichaPaciente.abortoEspontaneo || 'teste', indMarginLeft, indHeight);
    documento.text(this.fichaPaciente.adoeceu || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.agitacaoIrritabilidade || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.agrotoxicos || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.alt || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.alteracaoSNervoso || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ambulatorio || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.aparelhoAuditivo || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.aparelhoDigestorio || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.aparelhoRespiratorio || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.aparelhoUrinario || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.arritmia || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ast || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.aziaQueimacao || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.botaProtecao || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.cafeMlDia || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.catarroEscarro || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ch_e || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ch_p || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.ch_t || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.circunferenciaAbdominal || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.colicasDorBarriga || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.contatoPraguicida || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.creatinina || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.cultura || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.dcIrritativa || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.dcSensibilizante || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.diarreia || 'teste', indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.dificuldadeEngravidar || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.digestorioCancer || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.digestorioCancerfamilia || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.diminuicaoAudicao || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.diminuicaoUrina || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.doencaCardioVascular || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.dorCabeca || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.dorEstomago || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.edaRegiao || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.equipamentoProtecao || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.etilismo || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.etilismoAnterior || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.etilismoAtual || "teste", indMarginLeft, indHeight += 16);
    documento.addPage('a4','p');
    documento.text(this.fichaPaciente.exposicaoRaiox || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.faltaDeAr || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.familiaCancer || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.filhoMaFormacao || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.formaAplicacao || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.formigamento || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.fraquezaMuscular || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.frequenciaContatoPraguicida || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.funcaoTrabalho || "teste", indMarginLeft, indHeight += 16);
    documento.text(this.fichaPaciente.gestante || "teste", indMarginLeft, indHeight += 16);
    // documento.text("R$ 2400,00", 140, 118);


    const dateString = new Date(obj.fichas[0].dataCadastro).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    documento.save(`${obj.nome} - ${dateString}.pdf`);


    this.fichaPaciente = null;
  }

}

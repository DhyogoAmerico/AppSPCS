import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { SharedService } from 'src/app/services/shared.service';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.less']
})
export class DiagnosticosComponent extends BaseComponent implements OnInit {
  public valueSearch = '';
  public visiblePDF = false;
  public datePaciente: any;
  public infoTable = []
  public responseTable : any[];

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

  mountHeader(){
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

  ListarFichas(){
    this.sharedService.ListarFichaPaciente().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.responseTable = response || [];
      }
    )
  }

  printPDF() {
    var data = document.getElementById('content');  
    let doc = new jsPDF('p','pt','a4');
    doc.html(
      data, {
        callback: (pdf) => {
          pdf.save("teste.pdf");
        }
      }
    )
  }

  gerarPDF(){
    let documento = new jsPDF();
    documento.setFont("Courier",'bold');
    documento.setFontSize(20);
    documento.text("Ficha do paciente", 65, 15);

    documento.setFillColor(50,50,50);
    documento.rect(10, 20, 30, 8, "FD");
    documento.rect(10, 28, 30, 8, "FD");
    documento.rect(10, 36, 30, 8, "FD");
    documento.rect(40, 20, 160, 8, "s");
    documento.rect(40, 28, 160, 8, "s");
    documento.rect(40, 36, 160, 8, "s");

    documento.setFontSize(12);
    documento.setTextColor(255, 255, 255);
    documento.text("ID", 12, 25);
    documento.text("dataCadastro", 12, 33);
    documento.text("Preço", 12, 41);

    documento.setFont("curier",'normal');
    documento.setTextColor(0, 0, 0);
    documento.text("001", 42, 25);
    documento.text("Notebook 14' i7 8GB 1TB", 42, 33);
    documento.text("R$ 2400,00", 42, 41);
  }

  impressaoFicha(obj: any) {
    this.datePaciente = obj;

    let documento = new jsPDF('p','pt','a4');
    documento.setFont("Courier",'bold');
    documento.setFontSize(20);
    documento.text("Ficha do paciente", 65, 15);

    documento.setFillColor(50,50,50);
    documento.rect(10, 30, 55, 20, "FD");
    documento.rect(10, 75, 55, 20, "FD");
    documento.rect(10, 105, 55, 20, "FD");
    // documento.rect(40, 20, 160, 8, "s");
    // documento.rect(40, 28, 160, 8, "s");
    // documento.rect(40, 36, 160, 8, "s");

    documento.setFontSize(12);
    documento.setTextColor(255, 255, 255);
    documento.text("ID", 12, 30);
    documento.text("dataCadastro", 12, 75);
    documento.text("Preço", 12, 105);

    documento.setFont("Courier",'normal');
    documento.setTextColor(0, 0, 0);
    documento.text(obj.pacienteId || 'teste', 42, 25);
    documento.text(obj.dataCadastro || 'teste', 42, 33);
    documento.text("R$ 2400,00", 42, 41);

    documento.save("teste.pdf");
    
    // console.log(this.datePaciente)

    // this.visiblePDF = true;
    
    // html2canvas(data).then(canvas => {  
    //   // Few necessary setting options  
    //   var imgWidth = 208;   
    //   // var pageHeight = 295;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;  
    //   // var heightLeft = imgHeight;  
  
    //   const contentDataURL = canvas.toDataURL('image/png')  
    //   let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    //   var position = 0;  
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    //   pdf.save('MYPdf.pdf'); // Generated PDF   
    // });
    // this.priceListPDF.clear();
    // const factory = this.resolver.resolveComponentFactory(PrintPageComponent);
    // const componentRef = this.priceListPDF.createComponent(factory);

    // componentRef.instance.title = obj.pacienteId;
    // componentRef.instance.list = obj;

    // componentRef.instance.emitter.subscribe(() => {
    //   const config = {
    //     html2canvas: {
    //       scale: 1,
    //       scrollX: 0,
    //       scrollY: 0,
    //     },
    //   };

    //   this.print(componentRef.location.nativeElement, config);
    //   componentRef.destroy();
    // });
    this.datePaciente = null;
  }
  
  // private print(content: any, config: any): void {
  //   html2pdf()
  //     .set(config)
  //     .from(content)
  //     .toPdf()
  //     .outputPdf('dataurlnewwindow');
  // }
}

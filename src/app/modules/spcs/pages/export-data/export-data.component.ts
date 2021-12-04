import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { breadcrumb, CommonService } from 'src/app/services/common-service/common.service';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.less']
})
export class ExportDataComponent extends BaseComponent implements OnInit {

  public listOptions: any[];
  constructor(
    private sharedService: SharedService,
    private commomService: CommonService
  ) { 
    super();
  }

  ngOnInit() {
    this.mountBreadcrumb();
    this.listOptions = [
      {
        label: 'Nome',
        value: 'nome'
      },
      {
        label: 'Telefone',
        value: 'telefone'
      }
    ]
  }

  mountBreadcrumb(){
    let objBreadcrumb: breadcrumb[];
    objBreadcrumb = [
      {
        title: 'Painel',
        url: 'dashboard'
      },
      {
        title: 'Exportar Dados',
        url: ''
      }
    ]
    this.commomService.emitBreadcrumb(objBreadcrumb);
  }

  ExportDados() {
    this.sharedService.getAllUsers('paciente').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any[]) => {
        this.exportAsExcelFile(response)
      }
    )
  }

  exportAsExcelFile(json: any[], excelFileName: string = 'sample'): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }

}

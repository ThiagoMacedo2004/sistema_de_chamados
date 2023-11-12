import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-tabela-ocorrencias',
  templateUrl: './tabela-ocorrencias.component.html',
  styleUrls: ['./tabela-ocorrencias.component.css']
})
export class TabelaOcorrenciasComponent implements OnInit {

  displayedColumns: string[] = [
    'select',
    'loja',
    'ocorrencia',
    'motivo',
    'submotivo',
    'date_create',
    'analista',
    'date_final',
    'status'
  ]

  dataSource =  new MatTableDataSource<Ocorrencias>();
  selection = new SelectionModel<Ocorrencias>(true, []);

  result:Ocorrencias[] = []


  constructor(
    private _services:BackEndPhpService
  ) { }

  ngOnInit(): void {
    this.getOcorrencias()
  }

  getOcorrencias() {
    const obj = {
      acao: 'getOcorrencias',
      status: 'Aberta'
    }

    this._services.getOcorrencias(JSON.stringify(obj)).subscribe(
      data => this.setData(data)
    )
  }

  setData(data:any) {
    // this.dataSource.data.pop()
    console.log(data)
    this.dataSource = new MatTableDataSource(data)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Ocorrencias): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.loja + 1}`;
  }
}

interface Ocorrencias {
  analista    : string,
  analistaf   : string
  date_create : string,
  date_final  : string,
  descricao   : string,
  id          : number,
  loja        : string,
  motivo      : string,
  ocorrencia  : string,
  selected    : boolean,
  status      : string,
  submotivo   : string,
  triagem     : string
}

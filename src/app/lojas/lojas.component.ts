import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BackEndPhpService } from '../services/back-end-php.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarLojaComponent } from './editar-loja/editar-loja.component';
import { DetalheLojaComponent } from './detalhe-loja/detalhe-loja.component';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css']
})

export class LojasComponent implements OnInit {

  dataSource: any
  columnsToDisplay = ['LOJA', 'LOCAL', 'ENDERECO', 'BAIRRO', 'CEP', 'HORARIO_FUNC', 'STATUS'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'ACAO'];

  result: ListaLojas[] = []

  input:string = ''

  constructor(
    private _service:BackEndPhpService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getLojas()
  }

  getLojas() {
    this._service.getLojas().subscribe(
      (data:any) => this.setData(data)
    )
  }



  setData(data: ListaLojas[]) {
    this.dataSource = new MatTableDataSource(data)
  }

  dialogEditarLoja(loja: ListaLojas) {
    this._dialog.open(EditarLojaComponent, {
      data: loja,
      width: '75%'
    }).afterClosed().subscribe(
      (data) => {
        if(data == 'ok') {
          this.getLojas()
          this.input = ''
        }
      }
    )
  }

  dialogDetalheLoja(loja: ListaLojas) {
    this._dialog.open(DetalheLojaComponent, {
      data: loja,
      width: '75%',
      position: {
        left: '21%'
      }
    })
  }


  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

interface ListaLojas {
  ID: number,
  LOJA: string,
  LOCAL: string,
  ENDERECO: string,
  BAIRRO: string,
  CEP: string,
  HORARIO_FUNC: string,
  STATUS: string
}

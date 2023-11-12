import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { EditarLojaComponent } from '../editar-loja/editar-loja.component';
import { AdicionarLojaComponent } from '../adicionar-loja/adicionar-loja.component';
import { AdicionarServicoLojaComponent } from '../adicionar-servico-loja/adicionar-servico-loja.component';
import { EditarServicosComponent } from '../editar-servicos/editar-servicos.component';

@Component({
  selector: 'app-detalhe-loja',
  templateUrl: './detalhe-loja.component.html',
  styleUrls: ['./detalhe-loja.component.css']
})
export class DetalheLojaComponent implements OnInit {

  dataSource = new MatTableDataSource()

  columnsToDisplay: string[] = ['TIPO_SERVICO', 'OPERADORA', 'DESIGNACAO', 'VELOCIDADE', 'CNPJ', 'OBSERVACAO']
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'ACAO'];


  constructor(
    public _dialogRef: MatDialogRef<DetalheLojaComponent>,
    public _dialogOpen: MatDialog,
    private _router: Router,
    private _services: BackEndPhpService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    this.getServicosLoja()
    this._dialogRef.disableClose = true
  }

  editarLoja() {
    this._dialogRef.close()
    this._dialogOpen.open(EditarLojaComponent, {
      data: this.data,
      width: '75%',
      position: {
        left: '21%'
      }
    })
  }

  editarServico(servico: any) {
    const data = {
      loja: {
        loja: this.data.LOJA,
        idLoja: this.data.ID
      },
      servico: servico
    }
    this._dialogOpen.open(EditarServicosComponent, {
      data: data,
      width: '28%',
      position: {
        left: '39%'
      }
    }).afterClosed().subscribe(
      (result) => {
        if(result) {
          this.getServicosLoja()
        }
      }
    )
  }

  getServicosLoja() {
    const obj = {
      acao   : 'getServicosLoja',
      idLoja : this.data.ID
    }

    this._services.getServicosLoja(JSON.stringify(obj)).subscribe(
      (result:any) => {
        this.dataSource.data = result
        console.log(result)
      }

    )
  }

  adicionarNovoServico() {
    this._dialogRef.close()

    this._dialogOpen.open(AdicionarServicoLojaComponent, {
      data: this.data,
      width: '75%',
      position: {
        left: '21%'
      }
    })
  }

}

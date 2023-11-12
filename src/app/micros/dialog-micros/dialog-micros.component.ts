import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-dialog-micros',
  templateUrl: './dialog-micros.component.html',
  styleUrls: ['./dialog-micros.component.css']
})
export class DialogMicrosComponent implements OnInit {

  dataSource = new MatTableDataSource<Micros>()
  columnsToDisplay = ['LOJA', 'SERVICE_TAG', 'ASSET_TAG', 'FABRICANTE', 'MODELO','ANALISTA', 'OBSERVACAO'];
  columnsToDisplayWithSelect = [...this.columnsToDisplay, 'DATA', 'STATUS'];

  constructor(
    public dialogRef: MatDialogRef<DialogMicrosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Micros,
    private _services: BackEndPhpService,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.dialogRef.disableClose = true
    this.getHistoricoMicro()

  }

  getHistoricoMicro() {
    const obj = {
      acao: 'getHistoricoMicro',
      idMicro: this.data.ID_MICRO
    }
    this._services.getHistoricoMicro(JSON.stringify(obj)).subscribe(
      (data:any) => {
        if(data.length == 0) {
          this.dialogRef.updateSize("25%")
        }
        this.setData(data)
      }
    )
  }

  setData(result: Micros[]) {
    this.dataSource.data = result
  }

}

interface Micros {
  ID: number,
  ID_MICRO: number,
  LOCAL: string,
  ANALISTA: string,
  SERVICE_TAG: string,
  ASSET_TAG: string,
  FABRICANTE: string,
  MODELO: string,
  OBSERVACAO: string,
  DATA: Date,
  STATUS: string
}

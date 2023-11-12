import { Component, OnInit } from '@angular/core';
import { BackEndPhpService } from '../services/back-end-php.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogMicrosComponent } from './dialog-micros/dialog-micros.component';
import { DialogMovimentacaoMicroComponent } from './dialog-movimentacao-micro/dialog-movimentacao-micro.component';
import { AdicionarMicroComponent } from './adicionar-micro/adicionar-micro.component';

@Component({
  selector: 'app-micros',
  templateUrl: './micros.component.html',
  styleUrls: ['./micros.component.css']
})
export class MicrosComponent implements OnInit {

  dataSource = new MatTableDataSource<Micros>()
  columnsToDisplay = ['LOJA', 'SERVICE_TAG', 'ASSET_TAG', 'FABRICANTE', 'MODELO', 'STATUS'];
  columnsToDisplayWithSelect = ['select', ...this.columnsToDisplay, 'ACAO'];
  selection = new SelectionModel<Micros>(true, []);
  totalMicros: number = 0
  input:string = ''
  inputLoja: string = ''
  idLojaFilter!: number

  mask = [ /\d/, /\d/, '.', /\d/, /\d/, /\d/]

  lojasControl = new FormControl('')
  filteredLojas: Lojas[] = []
  lojas: Lojas[] = []

  usuarioLogado: any

  loadMicros: boolean = true

  opcoes: string[] = ['Loja', 'Service_Tag', 'Asset_Tag', 'Furto']

  constructor(
    private _service: BackEndPhpService,
    private _dialog: MatDialog
  ) {
    this.usuarioLogado = this._service.getUsuarioLogado()
    this.lojasControl.valueChanges.subscribe(
      (data:any) => {
        this.filteredLojas = this._filter(data || '')
      }
    )
  }

  ngOnInit(): void {
    this.getMicros()
    this.getLojas()

  }

  getMicros() {
    this._service.getMicros().subscribe(
      (data:any) => {
        this.loadMicros = false
        this.setData(data)
      }
    )
  }


  public _filter(value: string): Lojas[] {

    const filterValue = value.toLowerCase();

    return this.lojas.filter((loja: Lojas) => loja.LOJA.toLowerCase().includes(filterValue));
  }

  getLojas() {
    this._service.getLojas().subscribe(
      (data:any) =>{
        // console.log(data)
        this.lojas = data
        this.filteredLojas = data

      }
    )
  }

  setData(data: Micros[]) {
    this.dataSource.data = data
    this.totalMicros = this.dataSource.data.length
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if(this.dataSource.filteredData.length === 0) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;

    } else {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.filteredData.length;
      return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {

    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    if(this.dataSource.filteredData.length > 0) {
      this.selection.select(...this.dataSource.filteredData)
      console.log(this.selection.selected)
      console.log(this.selection.selected.length)
    } else {
      console.log(this.selection.selected.length)
      this.selection.select(...this.dataSource.data);
    }

  }

  atualizarInfoMicros() {
    console.log(this.selection.selected)
    console.log(this.lojasControl.value)

    let id_loja =  this.getIdLoja(this.lojasControl.value)

    if(!id_loja) {
      return
    }

    const obj = {
      acao: 'atualizarInfoMicros',
      idLoja: id_loja,
      idUsuario: this.usuarioLogado.id,
      objMicros: this.selection.selected
    }

    console.log(obj)

    this._service.atualizarInfoMicros(JSON.stringify(obj)).subscribe(
      (data:any) => {
        if(data.sucesso) {
          this._service.msgSucesso(data.sucesso)

          this.selection.clear()
        }
      }
    )

  }

  selectionClear() {
    this.selection.clear()
  }

  mascara() {
    // console.log(input.key)
    // this.myModel = input.value
    return this.mask

  }

  adicionarMicro() {
    this._dialog.open(AdicionarMicroComponent, {
      width: '25%'
    }).afterClosed().subscribe(
      (result) => {
        if(result == 'sucesso') {
          this.dataSource.data = []
          this.getMicros()
        }
      }
    )
  }

  deletarMicro(micro: Micros) {
    console.table(micro)

    const obj = {
      acao: 'deletarMicro',
      ID_MICRO: micro.ID_MICRO
    }

    this._service.deletarMicro(JSON.stringify(obj)).subscribe(
      (result: any) => {
        if(result.sucesso) {
          this._service.msgSucesso(result.sucesso)
          this.dataSource.data = []
          this.getMicros()
        } else {
          this._service.msgErro(result.erro)
        }
      }
    )
  }

  historicoMicro(micro: Micros) {
    console.log(micro)

    this._dialog.open(DialogMicrosComponent, {
      data: micro,
      width: '90%'
    })
  }

  movimentacaoMicro(micro:Micros) {
    console.log(micro)
    this._dialog.open(DialogMovimentacaoMicroComponent, {
      data: micro,
      width: '75%'
    }).afterClosed().subscribe(
      (result) => {
        if(!result) {
          return
        }
        this.input = ''
        this.dataSource.data = []
        this.dataSource.filter = ''
        this.totalMicros = 0
        this.getMicros()

      }
    )
  }

  getIdLoja(loja:any) {
    let filterLoja
    let idLoja

    filterLoja = this.lojas.filter(item => loja == item.LOJA)

    if (filterLoja.length == 0) {
      return this._service.msgErro("Loja Inválida. Selecione uma loja valida")
    }

    idLoja = filterLoja[0].ID

    return idLoja

  }

  applyFilter(event:any) {
    this.selection.clear()
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalMicros = this.dataSource.filteredData.length
  }

}

// LOCAL', 'SERVICE_TAG', 'ASSET_TAG', 'FABRICANTE', 'MODELO', 'OBSERCACAO', 'DATA_MOVIMENTACAO', 'STATUS']

interface Micros {
  ID_LOJA: number,
  LOJA: string,
  ID_MICRO: number,
  LOCAL: string,
  SERVICE_TAG: string,
  ASSET_TAG: string,
  FABRICANTE: string,
  MODELO: string,
  STATUS: string
}

interface Lojas {
  ID: number,
  LOJA: string
}

import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-dialog-movimentacao-micro',
  templateUrl: './dialog-movimentacao-micro.component.html',
  styleUrls: ['./dialog-movimentacao-micro.component.css']
})
export class DialogMovimentacaoMicroComponent implements OnInit {

  dataSource = new MatTableDataSource<Micros[]>()
  displayedColumns: string[] = ['LOCAL', 'SERVICE_TAG', 'ASSET_TAG', 'FABRICANTE', 'MODELO', 'STATUS']

  lojaAtual:string = ''
  status: string[] = ['OK', 'FURTO', 'RETIRADO', 'REPOSIÇÃO FURTADO', 'DANIFICADA', 'REPOSIÇÃO DANIFICADO']

  usuarioLogado: any
  formGroup!: FormGroup
  errosForm: any = {}
  lojas: Lojas[] = []
  filteredLojas:any
  matcher = new MyErrorStateMatcher();

  constructor(
    private _fb: FormBuilder,
    private _service: BackEndPhpService,
    public _dialog: MatDialogRef<DialogMovimentacaoMicroComponent>,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,

  ) {
    this.usuarioLogado = this._service.getUsuarioLogado()
    this.lojaAtual = data.LOJA
  }

  ngOnInit(): void {
    this.formulario()
    this.getLojas()
    this.errosFormulario()

    this.dataSource.data.push(this.data)
    this._dialog.disableClose = true

    this.formGroup.get('lojasControl')?.valueChanges.subscribe(
      (data:string) => this.filteredLojas = this._filter(data)
    )
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao         : ['movimentacaoMicro'],
      idMicro      : this.data.ID_MICRO,
      idUsuario    : this.usuarioLogado.id,
      lojasControl : ['', Validators.required],
      idLojaNew    : [''],
      idLojaOld    : [this.data.ID_LOJA],
      status       : ['', Validators.required],
      data         : ['', Validators.required],
      observacao   : ['', Validators.required]
    })

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

  movimentacaoMicro() {
    this.getIdLoja()
    this.formGroup.get('data')?.reset(this.getDate())
    this.formGroup.get('idLojaNew')?.reset(this.getIdLoja())

    if(this.formGroup.get('idLojaNew')?.value == null) {
      return this._service.msgErro('Loja inválida. Selecione uma loja da lista.')
    }

    console.log(this.formGroup.value)

    this._service.movimentacaoMicro(JSON.stringify(this.formGroup.value)).subscribe(
      (result:any) => {
        if(result.erro) {
          return this._service.msgSucesso(result.erro)
        }

        this._service.msgSucesso(result.sucesso)
        this._dialog.close(true)
      }
    )
  }

  getDate() {
    let data = new Date(this.formGroup.get('data')?.value)

    let ano: any = data.getFullYear()
    let mes: any = (data.getMonth()) + 1
    let dia: any = data.getDate()

    if(mes <= 9) {
      mes = `0${mes}`
    }

    if(dia <= 9) {
      dia = `0${dia}`
    }

    return `${ano}-${mes}-${dia}`
  }

  getIdLoja() {
    let loja = this.formGroup.get('lojasControl')?.value
    let filterLoja
    let idLoja

    filterLoja = this.lojas.filter(item => loja == item.LOJA)

    if (filterLoja.length == 0) {
      return this._service.msgErro("Loja Inválida. Selecione uma loja valida")
    }

    idLoja = filterLoja[0].ID

    return idLoja

  }

  errosFormulario() {
    this.errosForm.loja = this.formGroup.get('lojasControl')
    this.errosForm.status = this.formGroup.get('status')
    this.errosForm.data = this.formGroup.get('data')
    this.errosForm.observacao = this.formGroup.get('observacao')
  }


}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


interface Lojas {
  ID: number,
  LOJA: string
}

interface Micros {
  ID: number,
  ID_MICRO: number,
  LOCAL: string,
  MATRICULA: string,
  NOME: string,
  SERVICE_TAG: string,
  ASSET_TAG: string,
  FABRICANTE: string,
  MODELO: string,
  OBSERVACAO: string,
  DATA: Date,
  STATUS: string
}



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { MyErrorStateMatcher } from 'src/app/shared/msg-erros';

@Component({
  selector: 'app-adicionar-micro',
  templateUrl: './adicionar-micro.component.html',
  styleUrls: ['./adicionar-micro.component.css']
})
export class AdicionarMicroComponent implements OnInit {

  myModel       = ''
  mask          = [ /\d/, /\d/, '.', /\d/, /\d/, /\d/]

  formGroup!: FormGroup
  matcher = new MyErrorStateMatcher();

  lojas: Lojas[] = []
  filteredLojas:any

  constructor(
    public _dialogRef: MatDialogRef<AdicionarMicroComponent>,
    public _dialogOpen: MatDialog,
    public _fb: FormBuilder,
    private _router: Router,
    private _service: BackEndPhpService,
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.getLojas()
    this.mascara()

    this._dialogRef.disableClose = true

    this.formGroup.get('lojasControl')?.valueChanges.subscribe(
      (data:string) => this.filteredLojas = this._filter(data)
    )
  }

  public _filter(value: string): Lojas[] {
    const filterValue = value.toLowerCase();

    return this.lojas.filter((loja: Lojas) => loja.LOJA.toLowerCase().includes(filterValue));
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao         : ['adicionarMicro'],
      SERVICE_TAG  : ['', Validators.required],
      ASSET_TAG    : ['', Validators.required],
      FABRICANTE   : [{value:'Dell Inc.', disabled: true }, Validators.required,],
      MODELO       : [{value:'Optiplex 3080', disabled: true}, Validators.required],
      ID_LOJA      : [''],
      lojasControl : ['', Validators.required]
    })
  }

  adicionarMicro() {
    let id_loja =  this.getIdLoja(this.formGroup.get('lojasControl')?.value)

    if(!id_loja) {
      return
    }

    this.formGroup.get('ID_LOJA')?.reset(id_loja)
    this.formGroup.get('FABRICANTE')?.reset({value: 'Dell Inc.', disabled: false})
    this.formGroup.get('MODELO')?.reset({value: 'Optiplex 3080', disabled: false})

    const obj = JSON.stringify(this.formGroup.value)

    this._service.adicionarMicro(obj).subscribe(
      (result: any) => {
        if(result.sucesso) {
          this._service.msgSucesso(result.sucesso)
          this._dialogRef.close('sucesso')
        } else {
          this._service.msgErro(result.erro)
        }
      }
    )


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

  mascara() {
    // console.log(input.key)
    // this.myModel = input.value
    return this.mask

  }

}

interface Lojas {
  ID: number,
  LOJA: string
}

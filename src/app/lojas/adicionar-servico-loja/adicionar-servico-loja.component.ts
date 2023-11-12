import { DetalheLojaComponent } from './../detalhe-loja/detalhe-loja.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { MyErrorStateMatcher } from 'src/app/shared/msg-erros';

@Component({
  selector: 'app-adicionar-servico-loja',
  templateUrl: './adicionar-servico-loja.component.html',
  styleUrls: ['./adicionar-servico-loja.component.css']
})
export class AdicionarServicoLojaComponent implements OnInit {

  formGroup!: FormGroup
  matcher = new MyErrorStateMatcher();
  cnpjs: any[] = []
  operadoras: string[] = ['WCS', 'TELEFONICA - VIVO', 'TESA', 'ULTRANET', 'SAT FIBRA', 'NET FACIL', 'AMERICA NET', '76 TELECOM', 'CLARO-NET'].sort()
  TiposSevicos: string[] = ['LINK DE DADOS', 'BANDA LARGA', 'SPEEDY', 'VIVO FIBRA'].sort()

  constructor(
    public _dialogRef: MatDialogRef<AdicionarServicoLojaComponent>,
    public _dialogOpen: MatDialog,
    public _fb: FormBuilder,
    private _router: Router,
    private _services: BackEndPhpService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.getCnpjs()
    this._dialogRef.disableClose = true
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao        : ['adicionarServicoLoja'],
      idLoja      : [this.data.ID],
      operadora   : ['', Validators.required],
      tipoServico : ['', Validators.required],
      designacao  : ['', Validators.required],
      velocidade  : ['', Validators.required],
      idCnpj        : ['', Validators.required],
      observacao  : ['']
    })
  }

  getCnpjs() {
    const obj = {
      acao: 'getCnpjs'
    }

    this._services.getCnpjs(JSON.stringify(obj)).subscribe(
      (data: any) => this.cnpjs = data
    )
  }

  adicionarServicoLoja() {
    console.log(this.formGroup.value)

    this._services.adicionarServicoLoja(JSON.stringify(this.formGroup.value)).subscribe(
      (result: any) => {
        if(result.sucesso) {
          this._services.msgSucesso(result.sucesso)
          this._dialogRef.close()
          this._dialogOpen.open(DetalheLojaComponent, {
            data: this.data,
            width: '75%',
            position: {
              left: '21%'
            }
          })
        } else {
          this._services.msgErro(result.erro)
        }
      }
    )

  }

  closeDialog() {
    this._dialogRef.close()
  }



}

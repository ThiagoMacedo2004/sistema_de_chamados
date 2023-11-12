import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { AdicionarServicoLojaComponent } from '../adicionar-servico-loja/adicionar-servico-loja.component';
import { MyErrorStateMatcher } from 'src/app/shared/msg-erros';

@Component({
  selector: 'app-editar-servicos',
  templateUrl: './editar-servicos.component.html',
  styleUrls: ['./editar-servicos.component.css']
})
export class EditarServicosComponent implements OnInit {

  formGroup!: FormGroup
  matcher = new MyErrorStateMatcher();
  cnpjs: any[] = []
  operadoras: string[] = ['Wcs', 'Telefonica - Vivo', 'Ultranet', 'Sat Fibra', 'Net FAcil', 'America Net', '76 Telecom', 'Claro-net'].sort()
  TiposSevicos: string[] = ['Link De Dados', 'Banda Larga', 'Speedy', 'Vivo Fibra'].sort()

  velocidade:any

  constructor(
    public _dialogRef: MatDialogRef<EditarServicosComponent>,
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
    if(this.data.servico.VELOCIDADE.length == 5) {
      this.velocidade = this.data.servico.VELOCIDADE.substring(0, 3)
      parseInt(this.velocidade)
    } else {
      this.velocidade = this.data.servico.VELOCIDADE.substring(0, 2)
      parseInt(this.velocidade)
    }

    console.log(this.data)
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao        : ['editarServicoLoja'],
      idServico  : [this.data.servico.ID_SERVICO],
      idLoja      : [this.data.loja.idLoja],
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

  editarServicoLoja() {
    console.log(this.formGroup.value)

    this._services.editarServicoLoja(JSON.stringify(this.formGroup.value)).subscribe(
      (result: any) => {
        if(result.erro) {
          return this._services.msgErro(result.erro)
        }
        this._services.msgSucesso(result.sucesso)
        this._dialogRef.close(result.sucesso)
      }
    )
  }

}


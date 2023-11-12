import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';
import { MyErrorStateMatcher } from 'src/app/shared/msg-erros';

@Component({
  selector: 'app-editar-loja',
  templateUrl: './editar-loja.component.html',
  styleUrls: ['./editar-loja.component.css']
})
export class EditarLojaComponent implements OnInit {

  formGroup!: FormGroup
  errosForm: any = {}
  matcher = new MyErrorStateMatcher();

  mask          = [ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

  status: string[] = ['ABERTA', 'FECHADA']
  locais: string[] = ['Rua', 'Shopping', 'Carrefour'];
  horarios: string[] = ['09h as 20h', '09h às 18h', '10h às 22h']
  operadorasLink: string[] = ['SEM LINK', 'VIVO', 'WCS'].sort()
  operadorasBandaLarga: string[] = [
    'SEM BANDA LARGA',
    'VIVO SPEEDY',
    'VIVO FIBRA',
    'ULTRANET',
    'SAT FIBRA',
    'NET FACIL',
    'AMERICA NET',
    'VIVO GVT',
    '76 TELECOM',
    'NET'
  ].sort()

  constructor(
    private _fb: FormBuilder,
    private _service: BackEndPhpService,
    public _dialog: MatDialogRef<EditarLojaComponent>,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.errosFormulario()
    this.mascara()
    this._dialog.disableClose = true
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao           : ['editarLoja'],
      id              : this.data.ID,
      local           : ['', Validators.required],
      endereco        : ['', [Validators.required]],
      bairro          : ['', Validators.required],
      cep             : ['', Validators.required],
      horario         : ['', Validators.required],
      status          : ['', Validators.required],
    })
  }

  editarLoja() {
    this._service.editarLoja(JSON.stringify(this.formGroup.value)).subscribe(
      (data:any) => {
        if(data.erro) {
          return this._service.msgErro(data.sucesso)
        }
        this._dialog.close('ok')
        this._router.navigate(['listaLojas'])
        return this._service.msgSucesso(data.sucesso)

      }
    )
  }

  errosFormulario() {
    this.errosForm.local       = this.formGroup.get('local'),
    this.errosForm.endereco    = this.formGroup.get('endereco'),
    this.errosForm.bairro      = this.formGroup.get('bairro'),
    this.errosForm.cep         = this.formGroup.get('cep'),
    this.errosForm.horario     = this.formGroup.get('horario'),
    this.errosForm.status      = this.formGroup.get('status')
  }

  mascara() {
    return this.mask

  }

}

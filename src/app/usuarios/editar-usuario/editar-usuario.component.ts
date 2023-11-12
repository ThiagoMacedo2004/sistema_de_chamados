import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  formGroup!: FormGroup
  errosForm: any = {}
  matcher = new MyErrorStateMatcher();
  btnSalvar:boolean = true

  constructor(
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _services: BackEndPhpService,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.errosFormulario()
    this.formGroup.valueChanges.subscribe(
      () => this.btnSalvar = false
     )
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao        : ['editarUsuario'],
      id          : this.data.id,
      nome        : ['', Validators.required],
      matricula   : ['', Validators.required],
      email       : ['', [Validators.required, Validators.email]],
      senha       : ['', Validators.required],
      repeteSenha : ['', Validators.required]
    })
  }

  errosFormulario() {
    this.errosForm.nome = this.formGroup.get('nome')
    this.errosForm.matricula = this.formGroup.get('matricula')
    this.errosForm.email = this.formGroup.get('email')
    this.errosForm.senha = this.formGroup.get('senha')
    this.errosForm.repeteSenha = this.formGroup.get('repeteSenha')
  }

  editarUsuario() {
    this._services.editarUsuario(JSON.stringify(this.formGroup.value)).subscribe(
      (data:any) => {
        if(data.sucesso) {
          this._services.msgSucesso(data.sucesso)
          this.dialogRef.close("OK")
        } else {
          this._services.msgErro(data.erro)
        }
      }
    )
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

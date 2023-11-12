import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {

  formGroup!: FormGroup
  senhas: boolean = false
  errosForm: any = {}
  matcher = new MyErrorStateMatcher();
  typeBtn:boolean = false
  typeBtnDois:boolean = false

  constructor(
    private _services: BackEndPhpService,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.errosFormulario()
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao        : ['cadastrarNovoUsuario'],
      nome        : ['', Validators.required],
      matricula   : ['', Validators.required],
      email       : ['', [Validators.required, Validators.email]],
      senha       : ['', Validators.required],
      repeteSenha : ['', Validators.required],
      userAdm     : false
    })
  }

  errosFormulario() {
    this.errosForm.nome = this.formGroup.get('nome')
    this.errosForm.matricula = this.formGroup.get('matricula')
    this.errosForm.email = this.formGroup.get('email')
    this.errosForm.senha = this.formGroup.get('senha')
    this.errosForm.repeteSenha = this.formGroup.get('repeteSenha')
  }

  salvarUsuario() {
    if(this.formGroup.get('senha')?.value == this.formGroup.get('repeteSenha')?.value) {
      this._services.cadastrarNovoUsuario(JSON.stringify(this.formGroup.value)).subscribe(
        (result:any) => {
          if(result.sucesso) {
            this._services.msgSucesso(`${this.formGroup.get('nome')?.value} Cadastrado com sucesso!`)
            this._router.navigate(['usuarios'])
          } else {
            this._services.msgErro('Usuário já cadastrado. Verifique as informações.')
          }
        }
      )
    } else {
      this._services.msgErro('As senhas não conferem. Verifique a senha digitada.')
    }
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


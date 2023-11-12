import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BackEndPhpService } from '../services/back-end-php.service';
import { resourceLimits } from 'worker_threads';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  typeBtn:boolean = false
  formGroup!: FormGroup
  matcher = new MyErrorStateMatcher();
  login:Login = {
    matricula: '',
    senha:''
  }

  @Output() acesso = new EventEmitter()

  constructor(
    private _router: Router,
    private _services: BackEndPhpService,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formulario()
    this._services.usuarioLogado.subscribe(
      (result) => {
        console.log(result)
        this.acesso.emit(result)
      }
    )
  }

  formulario() {
    this.formGroup = this._fb.group({
      acao     : 'autenticacao',
      matricula: ['', Validators.required],
      senha    : ['', Validators.required]
    })
  }

  acessarSistema() {

    const obj = this.formGroup.value

    this._services.autenticacao(JSON.stringify(obj))

    this._services.usuarioLogado.subscribe(
      (result) => {
        this.acesso.emit(result)
      }
    )

  }
}

interface Login {
  matricula: number | '',
  senha    : string | ''
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

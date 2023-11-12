import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BackEndPhpService } from 'src/app/services/back-end-php.service';

@Component({
  selector: 'app-adicionar-loja',
  templateUrl: './adicionar-loja.component.html',
  styleUrls: ['./adicionar-loja.component.css']
})
export class AdicionarLojaComponent implements OnInit {

  formGroup!: FormGroup
  errosForm: any = {}
  matcher = new MyErrorStateMatcher();

  myModel       = ''
  mask          = [ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

  locais: string[] = ['Rua', 'Shopping', 'Carrefour']
  operadorasLink: string[] = ['SEM LINK', 'VIVO', 'WCS'].sort()
  horarios: string[] = ['09h às 20h', '09h às 18h', '10h às 22h']
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
    private _service: BackEndPhpService
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.errosFormulario()
    this.mascara()
  }

  mascara() {
    // console.log(input.key)
    // this.myModel = input.value
    return this.mask

  }

  formulario() {
    this.formGroup = this._fb.group({
      acao            : ['adicionarLoja'],
      loja            : ['', Validators.required],
      local           : ['', Validators.required],
      endereco        : ['', [Validators.required]],
      bairro          : ['', Validators.required],
      cep             : ['', Validators.required],
      horario         : ['', Validators.required]
    })
  }

  adicionarLoja() {
    this._service.adicionarLoja(JSON.stringify(this.formGroup.value)).subscribe(
      (data:any) => {
        if(data.erro) {
          return this._service.msgErro(data.erro)
        }

        this._service.msgSucesso(data.sucesso)

      }
    )
  }

  errosFormulario() {
    this.errosForm.loja = this.formGroup.get('local'),
    this.errosForm.local = this.formGroup.get('local'),
    this.errosForm.endereco = this.formGroup.get('endereco'),
    this.errosForm.bairro = this.formGroup.get('bairro'),
    this.errosForm.cep = this.formGroup.get('cep'),
    this.errosForm.horario = this.formGroup.get('horario')
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

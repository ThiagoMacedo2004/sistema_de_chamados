import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackEndPhpService {


  private URL_INDEX = 'http://www.matriz.com.br/ocorrencias_php/index.php'
  private URL_USUARIOS = 'http://www.matriz.com.br/ocorrencias_php/src/api/ApiUsuarios.php'
  private URL_LOJAS = 'http://www.matriz.com.br/ocorrencias_php/src/api/ApiLojas.php'
  private URL_MICROS = 'http://www.matriz.com.br/ocorrencias_php/src/api/ApiMicros.php'

  // private URL_USUARIOS = '/ocorrencias_php/src/api/ApiUsuarios.php'
  // private URL_LOJAS = '/ocorrencias_php/src/api/ApiLojas.php'
  // private URL_MICROS = '/ocorrencias_php/src/api/ApiMicros.php'

  usuarioLogado = new EventEmitter<boolean>()
  validacaoBackEnd:boolean = false

  infoUsuarioLogado:any

  constructor(
    private _http:HttpClient,
    private _msg:MatSnackBar,
    private _router: Router
  ) {}

  configErro: MatSnackBarConfig = {
    horizontalPosition : 'center',
    verticalPosition   : 'top',
    duration           : 5000
  }

  configMsgSucesso: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition  : 'top',
    duration          :  4000
  }

  // USUÁRIOS ****************************

  public getUsuarios() {
    const obj = {
      acao: 'getUsuarios'
    }

    return this._http.post(this.URL_USUARIOS, JSON.stringify(obj))
  }

  public cadastrarNovoUsuario(obj: any) {
    return this._http.post(this.URL_USUARIOS, obj)
  }

  public editarUsuario(obj: any) {
    return this._http.post(this.URL_USUARIOS, obj)
  }

  public alterarStatusUsuario(obj: any) {
    return this._http.post(this.URL_USUARIOS, obj)
  }

  public getOcorrencias(obj: any) {
    return this._http.post(this.URL_USUARIOS, obj)
  }

  public autenticacao(obj: any) {
    return this._http.post(this.URL_USUARIOS, obj).subscribe(
      (result:any) => {
        if(result.sucesso) {
          this.infoUsuarioLogado = result.sucesso
          this.validBackEnd(true)
        } else {
          this.validBackEnd(false)
          this.msgErro(result.erro)
        }
      }
    )
  }

  getUsuarioLogado() {
    return this.infoUsuarioLogado
  }


  public getMenus(id:any) {
    const obj = {
      acao    : 'getMenus',
      id_user : id
    }
    return this._http.post(this.URL_USUARIOS, JSON.stringify(obj))
  }


// LOJAS****************************

  public getLojas() {
    const obj = {
      acao: 'getLojas'
    }

    return this._http.post(this.URL_LOJAS, JSON.stringify(obj))
  }


  public adicionarLoja(obj: any) {
    return this._http.post(this.URL_LOJAS, obj)
  }

  public editarLoja(obj:any) {
    return this._http.post(this.URL_LOJAS, obj)
  }

  public adicionarServicoLoja(obj: any) {
    return this._http.post(this.URL_LOJAS, obj)
  }

  public getServicosLoja(obj: any) {
    return this._http.post(this.URL_LOJAS, obj)
  }

  public editarServicoLoja(obj: any) {
    return this._http.post(this.URL_LOJAS, obj)
  }

  public getCnpjs(obj: any) {
    return this._http.post(this.URL_LOJAS, obj)
  }

  /**
   *
   *
   *
   *
   */


  public validBackEnd(bool: boolean) {

    this.usuarioLogado.emit(bool)
    this.validacaoBackEnd = bool

  }

  public sairSistema() {
    this.usuarioLogado.emit(false)
    this.validacaoBackEnd = false
    this._router.navigate(['/'])
  }

  public returnBackend() {
    return this.validacaoBackEnd
  }

  // MICROS ****************************

  public getMicros() {
    const obj = {
      acao: 'getMicros'
    }

    return this._http.post(this.URL_MICROS, JSON.stringify(obj))
  }

  public adicionarMicro(obj:any) {
    return this._http.post(this.URL_MICROS, obj)
  }

  public deletarMicro(obj: any) {
    return this._http.post(this.URL_MICROS, obj)
  }

  public getHistoricoMicro(obj:any) {
    return this._http.post(this.URL_MICROS, obj)
  }

  public atualizarInfoMicros(obj:any) {
   return this._http.post(this.URL_MICROS, obj)
  }

  public movimentacaoMicro(obj: any) {
    return this._http.post(this.URL_MICROS, obj)
  }


  // ------------------------------------------------------

  public msgErro(msg:string) {
    this._msg.open(msg, 'X', this.configErro )
  }

  public msgSucesso(msg:string) {
    this._msg.open(msg, 'X', this.configMsgSucesso)
  }
}



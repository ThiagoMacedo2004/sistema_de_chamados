import { Component, OnChanges, OnInit } from '@angular/core';
import { BackEndPhpService } from '../services/back-end-php.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'matricula', 'email', 'date_create', 'date_block', 'perfil', 'status', 'acao' ]

  dataSource = new MatTableDataSource()
  result:any = []
  usuario: any

  constructor(
    private _services: BackEndPhpService,
    private _dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.getUsuarios()
    this.usuario = this._services.getUsuarioLogado()
  }

  getUsuarios() {
    this._services.getUsuarios().subscribe(
      (data:any) => {
        this.setData(data)
      }
    )
  }

  setData(data: Usuario) {
    this.result = data
    this.dataSource = new MatTableDataSource(this.result)
  }

  alterarStatusUsuario(item:any, status:string) {
    const obj = {
      acao  : 'alterarStatusUsuario',
      status: status,
      id    : item.id
    }

    this._services.alterarStatusUsuario(JSON.stringify(obj)).subscribe(
      (data:any) => {
        if(data.sucesso) {
          this.getUsuarios()
        }
      }
    )
  }

  editarUsuario(usuario:any) {
    console.log(usuario)
    this._dialog.open(EditarUsuarioComponent, {
      data: usuario,
      width: '60% '
    }).afterClosed().subscribe(
      (result) => result === "OK" ? this.getUsuarios() : null
    )
  }

}


interface Usuario {
  nome        : string,
  matricula   : string,
  email       : string,
  date_create : string,
  date_block  : string,
  perfil      : string,
  status      : string
}

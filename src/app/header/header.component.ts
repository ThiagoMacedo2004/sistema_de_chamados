import { Component, OnInit } from '@angular/core';
import { BackEndPhpService } from '../services/back-end-php.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario:any

  constructor(
    private _services:BackEndPhpService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = this._services.getUsuarioLogado()
  }

  sair() {
    this._services.sairSistema()
  }



}

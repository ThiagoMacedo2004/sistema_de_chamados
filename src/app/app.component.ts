import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BackEndPhpService } from './services/back-end-php.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sistema O.S';

  acesso:boolean = false

  constructor(
    private _router: Router,
    private _services: BackEndPhpService
  ) { }

  ngOnInit(): void {
    this._services.usuarioLogado.subscribe(
      (result) =>{
        this.acesso = result
        // this._router.navigate(['/login'])
      }
    )


  }

  login(evento:boolean) {
    if(evento) {
      this._router.navigate(['listaOcorrencias'])
      this.acesso = evento
    }
  }
}

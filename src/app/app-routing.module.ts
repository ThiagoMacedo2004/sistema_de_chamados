import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TabelaOcorrenciasComponent } from './ocorrencias/tabela-ocorrencias/tabela-ocorrencias.component';
import { AuthGuard } from './guards/auth-guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormularioUsuarioComponent } from './usuarios/formulario-usuario/formulario-usuario.component';
import { AppComponent } from './app.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { LojasComponent } from './lojas/lojas.component';
import { AdicionarLojaComponent } from './lojas/adicionar-loja/adicionar-loja.component';
import { MicrosComponent } from './micros/micros.component';
import { AdicionarMicroComponent } from './micros/adicionar-micro/adicionar-micro.component';


const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',   redirectTo: '/login', pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'listaOcorrencias',
    component: TabelaOcorrenciasComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'gerarOs',
    component: TabelaOcorrenciasComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'formularioUsuario',
    component: FormularioUsuarioComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'editarUsuario',
    component: EditarUsuarioComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'listaLojas',
    component: LojasComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'adicionarLoja',
    component: AdicionarLojaComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'listagemMicros',
    component: MicrosComponent,
    canActivate: [AuthGuard]

  },


  {
    path: 'adicionarMicro',
    component: AdicionarMicroComponent,
    canActivate: [AuthGuard]

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

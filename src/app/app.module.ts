import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTreeModule} from '@angular/material/tree';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { TextMaskModule } from 'angular2-text-mask';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import {MatNativeDateModule} from '@angular/material/core';

registerLocaleData(localePtBr);

/*
*
*
*/
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TabelaOcorrenciasComponent } from './ocorrencias/tabela-ocorrencias/tabela-ocorrencias.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormularioUsuarioComponent } from './usuarios/formulario-usuario/formulario-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { LojasComponent } from './lojas/lojas.component';
import { EditarLojaComponent } from './lojas/editar-loja/editar-loja.component';
import { AdicionarLojaComponent } from './lojas/adicionar-loja/adicionar-loja.component';
import { MicrosComponent } from './micros/micros.component';
import { DialogMicrosComponent } from './micros/dialog-micros/dialog-micros.component';
import { DialogMovimentacaoMicroComponent } from './micros/dialog-movimentacao-micro/dialog-movimentacao-micro.component';
import { DetalheLojaComponent } from './lojas/detalhe-loja/detalhe-loja.component';
import { EditarServicosComponent } from './lojas/editar-servicos/editar-servicos.component';
import { AdicionarServicoLojaComponent } from './lojas/adicionar-servico-loja/adicionar-servico-loja.component';
import { AdicionarMicroComponent } from './micros/adicionar-micro/adicionar-micro.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    TabelaOcorrenciasComponent,
    LoginComponent,
    UsuariosComponent,
    FormularioUsuarioComponent,
    EditarUsuarioComponent,
    LojasComponent,
    EditarLojaComponent,
    AdicionarLojaComponent,
    MicrosComponent,
    DialogMicrosComponent,
    DialogMovimentacaoMicroComponent,
    DetalheLojaComponent,
    EditarServicosComponent,
    AdicionarServicoLojaComponent,
    AdicionarMicroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    MatSnackBarModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule,
    TextMaskModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule
  ],
  providers: [
    AuthGuard,
    FormularioUsuarioComponent,
    { provide: LOCALE_ID, useValue: 'pt-br' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

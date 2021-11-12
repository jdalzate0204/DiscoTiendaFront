import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EspacioAdministradorComponent } from './components/Administrador/espacio-administrador/espacio-administrador.component';
import { CrearArtistaComponent } from './components/Administrador/crear-artista/crear-artista.component';
import { CrearCancionComponent } from './components/Administrador/crear-cancion/crear-cancion.component';
import { CrearAlbumComponent } from './components/Administrador/crear-album/crear-album.component';
import { InicioDeSesionComponent } from './components/Principal/inicio-de-sesion/inicio-de-sesion.component';
import { HistorialVentasComponent } from './components/Administrador/historial-ventas/historial-ventas.component';
import { PagoComponent } from './components/Tienda/pago/pago.component';
import { CatalogoComponent } from './components/Tienda/catalogo/catalogo.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ValidacionComponent } from './components/Principal/validacion/validacion.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    EspacioAdministradorComponent,
    CrearArtistaComponent,
    CrearCancionComponent,
    CrearAlbumComponent,
    InicioDeSesionComponent,
    HistorialVentasComponent,
    PagoComponent,
    CatalogoComponent,
    ValidacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    NoopAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

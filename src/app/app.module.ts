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

@NgModule({
  declarations: [
    AppComponent,
    EspacioAdministradorComponent,
    CrearArtistaComponent,
    CrearCancionComponent,
    CrearAlbumComponent,
    InicioDeSesionComponent,
    HistorialVentasComponent,
    PagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

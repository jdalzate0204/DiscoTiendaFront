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
import { environment } from 'src/environments/environment';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CancionesComponent } from './components/Tienda/catalogo/canciones/canciones.component';
import { FacturaComponent } from './components/Tienda/factura/factura.component';
import { SeguimientoComponent } from './components/Administrador/seguimiento/seguimiento.component';
import { CarritoComponent } from './components/Tienda/carrito/carrito.component';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      let tk = sessionStorage.getItem(environment.TOKEN);
      return tk != null ? tk : '';
    },
      allowedDomains: [
        "http://localhost:8080/DiscoTiendaWar/"
      ],
      dissallowedRoutes: [
        "http://localhost:8080/DiscoTiendaWar/api/auth/login",
        "http://localhost:8080/DiscoTiendaWar/api/ventas/listarCatalogo",
        "http://localhost:8080/DiscoTiendaWar/api/ventas/listarPago",
        "http://localhost:8080/DiscoTiendaWar/api/ventas/agregarCarrito",
        "http://localhost:8080/DiscoTiendaWar/api/ventas/listarCarrito",
        "http://localhost:8080/DiscoTiendaWar/api/ventas/guardarHistorial",
        "http://localhost:8080/DiscoTiendaWar/api/ventas/listarPago/",
        "http://localhost:8080/DiscoTiendaWar/api/canciones/listarPorIdCatalogo/",
        "http://localhost:8080/DiscoTiendaWar/api/canciones/listarCanciones/"
      ]
  }
}

@NgModule({
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
    MatTableModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [],
      },
    })
  ],
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
    ValidacionComponent,
    CancionesComponent,
    FacturaComponent,
    SeguimientoComponent,
    CarritoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

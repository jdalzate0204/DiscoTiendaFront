import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAlbumComponent } from './components/Administrador/crear-album/crear-album.component';
import { CrearArtistaComponent } from './components/Administrador/crear-artista/crear-artista.component';
import { CrearCancionComponent } from './components/Administrador/crear-cancion/crear-cancion.component';
import { EspacioAdministradorComponent } from './components/Administrador/espacio-administrador/espacio-administrador.component';
import { HistorialVentasComponent } from './components/Administrador/historial-ventas/historial-ventas.component';
import { SeguimientoComponent } from './components/Administrador/seguimiento/seguimiento.component';
import { InicioDeSesionComponent } from './components/Principal/inicio-de-sesion/inicio-de-sesion.component';
import { CancionesComponent } from './components/Tienda/catalogo/canciones/canciones.component';
import { CatalogoComponent } from './components/Tienda/catalogo/catalogo.component';
import { FacturaComponent } from './components/Tienda/factura/factura.component';
import { PagoComponent } from './components/Tienda/pago/pago.component';

const routes: Routes = [
  {path: '', component: CatalogoComponent},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'catalogo/canciones/:id', component: CancionesComponent},
  {path: 'factura', component: FacturaComponent},
  {path: 'iniciarSesion', component: InicioDeSesionComponent},
  {path: 'espacioAdministrador', component: EspacioAdministradorComponent},
  {path: 'artistas', component: CrearArtistaComponent},
  {path: 'albumes', component: CrearAlbumComponent},
  {path: 'canciones', component: CrearCancionComponent},
  {path: 'ventas', component: HistorialVentasComponent},
  {path: 'seguimiento', component: SeguimientoComponent},
  {path: 'pago', component: PagoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

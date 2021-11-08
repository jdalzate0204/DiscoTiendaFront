import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAlbumComponent } from './components/Administrador/crear-album/crear-album.component';
import { CrearArtistaComponent } from './components/Administrador/crear-artista/crear-artista.component';
import { CrearCancionComponent } from './components/Administrador/crear-cancion/crear-cancion.component';
import { EspacioAdministradorComponent } from './components/Administrador/espacio-administrador/espacio-administrador.component';
import { HistorialVentasComponent } from './components/Administrador/historial-ventas/historial-ventas.component';
import { InicioDeSesionComponent } from './components/Principal/inicio-de-sesion/inicio-de-sesion.component';
import { PagoComponent } from './components/Tienda/pago/pago.component';

const routes: Routes = [
  {path: '', component: EspacioAdministradorComponent},
  {path: 'iniciarSesion', component: InicioDeSesionComponent},
  {path: 'espacioAdministrador', component: EspacioAdministradorComponent},
  {path: 'artistas', component: CrearArtistaComponent},
  {path: 'albumes', component: CrearAlbumComponent},
  {path: 'canciones', component: CrearCancionComponent},
  {path: 'ventas', component: HistorialVentasComponent},
  {path: 'pago', component: PagoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

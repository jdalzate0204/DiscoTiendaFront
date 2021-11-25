import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Album } from '../_model/Album';
import { Cancion } from '../_model/Cancion';
import { Carrito } from '../_model/Carrito';
import { CarritoListar } from '../_model/CarritoListar';
import { Pago } from '../_model/Pago';
import { Venta } from '../_model/Venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private URL: string = environment.API + '/ventas';

  constructor(private http: HttpClient) { }

  getCatalogo(){
    return this.http.get<Album[]>(this.URL + "/listarCatalogo");
  }

  getSelectPago() {
    return this.http.get<Pago[]>(this.URL + '/listarPago');
  }

  postAgregarCarrito(carrito: Carrito) {
    return this.http.post<Carrito>(this.URL + '/agregarCarrito', carrito);
  }

  getListarCarrito() {
    return this.http.get<CarritoListar[]>(this.URL + '/listarCarrito');
  }

  postGuardarHistorial(venta: Venta) {
    return this.http.post<Venta>(this.URL + '/guardarHistorial', venta);
  }

  putEditarEstadoCarrito(estado: boolean) {
    return this.http.put(this.URL + '/editarEstado', estado);
  }

  getListarPago(id: number) {
    return this.http.get<Pago>(this.URL + '/listarPago/' + id);
  }

  getHistorial() {
    return this.http.get<Venta[]>(this.URL + '/listarHistorial');
  }
}

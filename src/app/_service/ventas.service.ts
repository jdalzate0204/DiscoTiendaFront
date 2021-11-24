import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Album } from '../_model/Album';
import { Cancion } from '../_model/Cancion';
import { Pago } from '../_model/Pago';

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
}

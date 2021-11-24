import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cancion } from '../_model/Cancion';
import { Formato } from '../_model/Formato';

@Injectable({
  providedIn: 'root'
})
export class CancionesService {

  private URL: string = environment.API + '/canciones';

  constructor(private http: HttpClient) { }

  getListarFormato(){
    return this.http.get<Formato[]>(this.URL + '/listarFormato');
  }

  postCrearCancion(cancion: Cancion){
    return this.http.post<Cancion>(this.URL + '/guardar', cancion);
  }

  getListarCanciones(){
    return this.http.get<Cancion[]>(this.URL + '/listarCanciones');
  }

  getListarCancionesPorId(idAlbum:Number){
    return this.http.get<Cancion[]>(this.URL+'listarCancionesPorId/'+idAlbum);
  }

  putCancion(cancion:Cancion){
    return this.http.put(this.URL+'/editar',cancion); 
  }

  getCanciones(idAlbum: number) {
    return this.http.get<Cancion[]>(this.URL + '/listarPorIdAlbum/' + idAlbum);
  }
  
  getListarId(id:number){
    return this.http.get<Cancion[]>(this.URL+'/listarPorId/'+id);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Artista } from '../_model/Artista';
import { GeneroMusical } from '../_model/GeneroMusical';
import { Sexo } from '../_model/Sexo';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

 private URL: string = environment.API + '/artistas';

  constructor(private http: HttpClient) { }

  postCrearArtista(artista: Artista){
    return this.http.post<Artista>(this.URL + "/guardar", artista);
  }

  getlistarGenero(){
    return this.http.get<GeneroMusical[]>(this.URL+"/listarGenero");
  }

  getlistarSexo(){
    return this.http.get<Sexo[]>(this.URL+"/listarSexo");
  }
}


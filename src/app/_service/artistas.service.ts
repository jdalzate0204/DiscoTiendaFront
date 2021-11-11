import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArtistaSelect } from '../_model/ArtistaSelect';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  
  private URL: string = environment.API + '/artistas';

  constructor(private http: HttpClient) { }

  getSelectArtista() {
    return this.http.get<ArtistaSelect[]>(this.URL + "/listarArtistas");
  }
}

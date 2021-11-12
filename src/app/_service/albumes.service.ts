import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Album } from '../_model/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private URL: string = environment.API + '/albumes';

  constructor(private http: HttpClient) { }

  postCrearAlbum(album: Album) {
    return this.http.post<Album>(this.URL + "/guardar", album);
  }

  getListarAlbumes() {
    return this.http.get<Album[]>(this.URL + "/listar");
  }
}

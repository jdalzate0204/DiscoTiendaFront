import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Administrador } from '../_model/Administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) { }

  private URL: string =environment.API+'/auth';

  postLogin(administrador :Administrador){
    return this.http.post<any>(this.URL+"/login",administrador);
  }

  deleteCerrarSesion(idAdministrador:number){
    return this.http.delete(this.URL+"/cerrarSesion/"+idAdministrador);
  }
}




import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdministradorService } from './_service/administrador.service';

var jquery: NodeRequire = require("../assets/jquery.js");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  sesionIniciada!:boolean;
  idAdmin!:string;

  constructor(private router:Router,
    private administrador:AdministradorService){
    (<any>window).jQuery = jquery;
    (<any>window).$ = jquery;
    var nicepage: NodeRequire = require("../assets/nicepage.js");
  }
 
  ngDoCheck():void{
  let token:String | null=sessionStorage.getItem(environment.TOKEN);
  if(token==null){
    this.sesionIniciada=false;
  }else{
    this.sesionIniciada=true;
  }

  }

  cerrarSesion(){
    let idAdministrador = sessionStorage.getItem(environment.ADMINISTRADOR);
    
    if(!isNaN(Number(idAdministrador))) {
      var idAdminNumero = Number(idAdministrador);

      this.administrador.deleteCerrarSesion(idAdminNumero).subscribe(data=>{
        this.router.navigate(["catalogo"]);
      });

      sessionStorage.removeItem(environment.TOKEN);
      sessionStorage.removeItem(environment.ADMINISTRADOR);
    } else {
      console.log("No funcionó");
    }
  }
}

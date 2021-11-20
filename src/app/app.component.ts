import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

var jquery: NodeRequire = require("../assets/jquery.js");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  sesionIniciada!:boolean;

  constructor(private router:Router){
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
    sessionStorage.removeItem(environment.TOKEN);
    this.router.navigate(["catalogo"]);
  }

}

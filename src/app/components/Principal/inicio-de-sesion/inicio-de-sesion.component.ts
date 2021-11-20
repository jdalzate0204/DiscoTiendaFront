import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/_model/Administrador';
import { AdministradorService } from 'src/app/_service/administrador.service';
import { environment } from 'src/environments/environment';
import { ValidacionComponent } from '../validacion/validacion.component';

@Component({
  selector: 'app-inicio-de-sesion',
  templateUrl: './inicio-de-sesion.component.html',
  styleUrls: ['./inicio-de-sesion.component.css']
})
export class InicioDeSesionComponent implements OnInit {

  loginForm!:FormGroup;
  token!:string;

  constructor(private administrador:AdministradorService,
    private _snackBar:MatSnackBar,private router:Router) {
    this.loginForm=this.createFormGroup();
   }

  createFormGroup(){
    return new FormGroup({
      usuario:new FormControl('',[Validators.required]),
      contrasena:new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
  }

  getError(){
    let mensajeError:string[]=[];
    if(this.loginForm.controls.usuario.hasError('required')){
      mensajeError.push("Digite el usuario");
    }
    if(this.loginForm.controls.contrasena.hasError('required')){
      mensajeError.push("Digite la contraseña");
    }
    return mensajeError;
  }

  iniciarSesion(event:Event){

    if(this.loginForm.valid){
      const value=this.loginForm.value;
      let administrador : Administrador=new Administrador();
      administrador.contrasena=value.contrasena;
      administrador.usuario=value.usuario;
      this.administrador.postLogin(administrador).subscribe(data=>{
      this.token=data.token;
      sessionStorage.setItem(environment.TOKEN,this.token);
      this.router.navigate(["espacioAdministrador"]);
      },err=>{
        if(err.status==401){
          this._snackBar.open('Usuario y/o contrasena incorrecta','cerrar',{
            duration:3000
          });
        }
      }  
      );


    }else{
      let mensajeError=this.getError();
      this._snackBar.openFromComponent(ValidacionComponent, {

        data: mensajeError,

        duration: 3000

      });
    }
  }


}

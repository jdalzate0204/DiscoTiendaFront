import { Component, OnInit } from '@angular/core';
import { GeneroMusical } from 'src/app/_model/GeneroMusical';
import { Sexo } from 'src/app/_model/Sexo';
import { ArtistaService } from 'src/app/_service/artistas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidacionComponent } from '../../Principal/validacion/validacion.component';
import { Artista } from 'src/app/_model/Artista';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-crear-artista',
  templateUrl: './crear-artista.component.html',
  styleUrls: ['./crear-artista.component.css']
})
export class CrearArtistaComponent implements OnInit {

 selectSexo: Sexo={id:0,descripcion: ''};
 sexo!:Sexo[];
 selectGenero: GeneroMusical={id:0,descripcion: ''};
 generoMusical!:Sexo[];
 artistaForm!:FormGroup;

  constructor(private artistasService:ArtistaService,
    private _snackBar:MatSnackBar,
    private artistaService:ArtistaService ){;
    this.artistaForm=this.createFormGroup();
    
  }

  createFormGroup() {

    return new FormGroup({

      nombre: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      nacionalidad: new FormControl('', [Validators.required, Validators.email]),
      generoMusical: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.artistasService.getlistarGenero().subscribe(data =>{
      this.generoMusical=data;
    });
    this.artistasService.getlistarSexo().subscribe(data =>{
      this.sexo=data;
    });
  }

  mensajeError(){
    let error : string []=[];

    if(this.artistaForm.controls.nombre.hasError('required')){
      error.push("Ingrese el nombre");
    }
    if(this.artistaForm.controls.fechaNacimiento.hasError('required')){
      error.push("Ingrese la fecha de nacimiento");
    }
    if(this.artistaForm.controls.sexo.hasError('required')){
      error.push("Ingrese el sexo");
    }
    if(this.artistaForm.controls.nacionalidad.hasError('required')){
      error.push("Ingrese la nacionalidad");
    }
    if(this.artistaForm.controls.generoMusical.hasError('required')){
      error.push("Ingrese el genero musical");
    }
    return error;
  }

  crearArtista(event: Event){
   if(this.artistaForm.valid){
     const value =this.artistaForm.value;

     let artista:Artista=new Artista();
     artista.nombre=value.nombre;
     artista.fechaNacimiento=value.fechaNacimiento;
     artista.nacionalidad=value.nacionalidad;
     artista.idGeneroMusical=value.generoMusical;
     artista.idSexo=value.sexo;

     this.artistaService.postCrearArtista(artista).subscribe(data =>{
     },err=>{
        if(err.status ==400){

        }else if (err.status==409){
          this._snackBar.open('El artista ya esta registrado','cerrar',{
             duration:3000
          });
        }
     });

   }else{
    let error =this.mensajeError();

    this._snackBar.openFromComponent(ValidacionComponent, {

      data: error,

      duration: 5000

    });
   }
  }

}

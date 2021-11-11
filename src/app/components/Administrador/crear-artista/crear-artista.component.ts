import { Component, OnInit } from '@angular/core';
import { GeneroMusical } from 'src/app/_model/GeneroMusical';
import { Sexo } from 'src/app/_model/Sexo';
import { ArtistaService } from 'src/app/_service/artistas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar:MatSnackBar){;
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
      error.push("Ingresela nacionalidad");
    }
    if(this.artistaForm.controls.generoMusical.hasError('required')){
      error.push("Ingrese el genero musical");
    }
    return error;
  }

  crearArtista(event: Event){
   if(this.artistaForm.valid){

   }else{
    let error =this.mensajeError();

    this._snackBar.openFromComponent(ValidacionComponent, {

      data: error,

      duration: 5000

    });
   }
  }

}

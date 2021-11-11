import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArtistaSelect } from 'src/app/_model/ArtistaSelect';
import { ArtistaService } from 'src/app/_service/artistas.service';
import { ValidacionComponent } from '../../Principal/validacion/validacion.component';

@Component({
  selector: 'app-crear-album',
  templateUrl: './crear-album.component.html',
  styleUrls: ['./crear-album.component.css']
})
export class CrearAlbumComponent implements OnInit {

  selectArtista: ArtistaSelect = {id: 0, nombre: ''};
  artista!: ArtistaSelect[];
  albumForm!: FormGroup;

  constructor(private artistasService: ArtistaService,
    private _snackBar: MatSnackBar) { 
    this.albumForm! = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      artista: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      fechaLanzamiento: new FormControl('', [Validators.required, Validators.email]),
      precio: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.artistasService.getSelectArtista().subscribe( data => {
      this.artista = data;
    });  
  }

  mensajeError() {
    let error: string[] = [];

    if(this.albumForm.controls.artista.hasError('required')){
      error.push("Ingrese un artista");
    }

    if(this.albumForm.controls.nombre.hasError('required')){
      error.push("Ingrese el nombre del album");
    }

    if(this.albumForm.controls.descripcion.hasError('required')){
      error.push("Ingrese una descripción del album");
    }

    if(this.albumForm.controls.fechaLanzamiento.hasError('required')){
      error.push("Ingrese la fecha de lanzamiento del album");
    }

    if(this.albumForm.controls.precio.hasError('required')){
      error.push("Ingrese el precio del album");
    }

    if(this.albumForm.controls.imagen.hasError('required')){
      error.push("Suba una imagen del album");
    }

    return error;
  }

  crearAlbum(event: Event) {
    if (this.albumForm.valid) {

    } else {
      let error = this.mensajeError();

      this._snackBar.openFromComponent(ValidacionComponent, {
        data: error,
        duration: 5000
      });
    }
  }

}

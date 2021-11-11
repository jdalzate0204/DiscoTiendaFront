import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Album } from 'src/app/_model/Album';
import { ArtistaSelect } from 'src/app/_model/ArtistaSelect';
import { AlbumService } from 'src/app/_service/albumes.service';
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
    private _snackBar: MatSnackBar,
    private albumService: AlbumService) { 
    this.albumForm! = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      artista: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      fechaLanzamiento: new FormControl('', [Validators.required]),
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
      error.push("Seleccione un artista");
    }
    console.log("artista: " + this.albumForm.controls.artista.invalid);

    if(this.albumForm.controls.nombre.hasError('required')){
      error.push("Ingrese el nombre del album");
    }
    console.log("nombre: " + this.albumForm.controls.nombre.invalid);

    if(this.albumForm.controls.descripcion.hasError('required')){
      error.push("Ingrese una descripción del album");
    }
    console.log("descripcion: " + this.albumForm.controls.descripcion.invalid);

    if(this.albumForm.controls.fechaLanzamiento.hasError('required')){
      error.push("Ingrese la fecha de lanzamiento del album");
    }
    console.log("fecha: " + this.albumForm.controls.fechaLanzamiento.invalid);

    if(this.albumForm.controls.precio.hasError('required')){
      error.push("Ingrese el precio del album");
    }
    console.log("precio: " + this.albumForm.controls.precio.invalid);

    if(this.albumForm.controls.imagen.hasError('required')){
      error.push("Suba una imagen del album");
    }
    console.log("imagen: " + this.albumForm.controls.imagen.invalid);

    return error;
  }

  crearAlbum(event: Event) {
    if (this.albumForm.valid) {
      const value = this.albumForm.value;

      let album: Album = new Album();
      album.idArtista = value.artista;
      album.nombre = value.nombre;
      album.descripcion = value.descripcion;
      album.fechaLanzamiento = value.fechaLanzamiento;
      album.precio = value.precio;
      album.imagen = value.imagen;
      console.log(album);

      this.albumService.postCrearAlbum(album).subscribe(data => {

      }, err => {
        if(err.status == 400) {
          
        } else if (err.status == 409) {
          this._snackBar.open('El album ya está registrado', 'Cerrar', {
            duration: 3000
          });
        }
      });

    } else {
      let error = this.mensajeError();

      this._snackBar.openFromComponent(ValidacionComponent, {
        data: error,
        duration: 5000
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlbumSelect } from 'src/app/_model/AlbumSelect';
import { Cancion } from 'src/app/_model/Cancion';
import { Formato } from 'src/app/_model/Formato';
import { AlbumService } from 'src/app/_service/albumes.service';
import { CancionesService } from 'src/app/_service/canciones.service';
import { ValidacionComponent } from '../../Principal/validacion/validacion.component';

@Component({
  selector: 'app-crear-cancion',
  templateUrl: './crear-cancion.component.html',
  styleUrls: ['./crear-cancion.component.css']
})
export class CrearCancionComponent implements OnInit {

  selectFormato: Formato = {id: 0, descripcion: ''};
  formato!: Formato[];
  selectAlbum: AlbumSelect = {id: 0, nombre: ''};
  albumSelect!: AlbumSelect[];
  cancionForm!: FormGroup;
  cancion: Cancion[] = [];
  cancionMostrar: Cancion[] = [];

  constructor(private cancionService: CancionesService,
    private albumService: AlbumService,
    private _snackBar: MatSnackBar) { 
    this.cancionForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      album: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      duracion: new FormControl('', [Validators.required]),
      formato: new FormControl('', [Validators.required]),
      colaboraciones: new FormControl(''),
      precio: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.cancionService.getListarFormato().subscribe( data => {
      this.formato = data;
    });

    this.albumService.getListarSelect().subscribe( data => {
      this.albumSelect = data;
    });

    this.cancionService.getListarCanciones().subscribe( data => {
      this.cancion = data;
      this.cancionMostrar = data;
    });
  }

  mensajeError() {
    let error: string[] = [];

    if(this.cancionForm.controls.album.hasError('required')){
      error.push("Seleccione un album");
    }

    if(this.cancionForm.controls.nombre.hasError('required')){
      error.push("Ingrese el nombre de la canción");
    }

    if(this.cancionForm.controls.descripcion.hasError('required')){
      error.push("Ingrese una descripción de la canción");
    }

    if(this.cancionForm.controls.duracion.hasError('required')){
      error.push("Ingrese la duración de la canción");
    }

    if(this.cancionForm.controls.precio.hasError('required')){
      error.push("Ingrese el precio de la canción");
    }

    if(this.cancionForm.controls.formato.hasError('required')){
      error.push("Seleccione un formato");
    }

    return error;
  }

  crearCancion(event: Event){
    if (this.cancionForm.valid) {
      const value = this.cancionForm.value;

      let cancion: Cancion = new Cancion();
      cancion.idAlbum = value.album;
      cancion.colaboraciones = value.colaboraciones;
      cancion.descripcion = value.descripcion;
      cancion.duracion = value.duracion;
      cancion.idFormato = value.formato;
      cancion.nombre = value.nombre;
      cancion.precio = value.precio;

      this.cancionService.postCrearCancion(cancion).subscribe( data => {
        this._snackBar.open('Canción registrada exitosamente', 'Cerrar', {
          duration: 3000
        })
        this.onResetForm();
      }, err => {
        if(err.status == 400) {
          this._snackBar.open('Error de validación de campos', 'Cerrar', {
            duration: 3000
          });
        } else if (err.status == 409) {
          this._snackBar.open('La canción ya está registrada', 'Cerrar', {
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

  onResetForm() {
    this.cancionForm.reset();

    Object.keys(this.cancionForm.controls).forEach(key => {
      this.cancionForm.get(key)?.setErrors(null);
    });
  }

  filtrar(event: Event) {
    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    this.cancionMostrar = this.cancion.filter(c => c.nombre.toLowerCase().includes(elemento.value.toLowerCase())
    || c.album.toLowerCase().includes(elemento.value.toLowerCase())
    || c.formato.toLowerCase().includes(elemento.value.toLowerCase())
    || c.precio.toPrecision().includes(elemento.value));
  }
}

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
  album: Album[] = [];
  albumMostrar: AlbumInterfaz[] = [];
  albumInterfaz:AlbumInterfaz[]=[];
  albumInterfazFiltrados: AlbumInterfaz[] = [];
  albumEditar:Album=new Album();

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

    this.actualizarAlbum();
  }

  mensajeError() {
    let error: string[] = [];

    if(this.albumForm.controls.artista.hasError('required')){
      error.push("Seleccione un artista");
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
      const value = this.albumForm.value;

      let album: Album = new Album();
      album.idArtista = value.artista;
      album.nombre = value.nombre;
      album.descripcion = value.descripcion;
      album.fechaLanzamiento = value.fechaLanzamiento;
      album.precio = value.precio;
      album.imagen = value.imagen;

      this.albumService.postCrearAlbum(album).subscribe(data => {
        this._snackBar.open('Álbum registrado exitosamente', 'Cerrar', {
          duration: 3000
        })
        this.onResetForm();
      }, err => {
        if(err.status == 400) {
          this._snackBar.open('Error de validación de campos', 'Cerrar', {
            duration: 3000
          });
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

  onResetForm() {
    this.albumForm.reset();

    Object.keys(this.albumForm.controls).forEach(key => {
      this.albumForm.get(key)?.setErrors(null);
    });
  }

  filtrar(event: Event) {
    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    this.albumInterfazFiltrados = this.albumInterfaz.filter(a => a.nombre.toLowerCase().includes(elemento.value.toLowerCase())
    || a.artista.toLowerCase().includes(elemento.value.toLowerCase())
    || a.precio.toPrecision().includes(elemento.value));
  }

  hacerAlbumEditable(albumInterfaz:AlbumInterfaz){
    albumInterfaz.editable=true;
  }

  editarAlbum(albumInterfaz:AlbumInterfaz){
    this.albumService.getListarId(albumInterfaz.id).subscribe(data=>{
      
      this.albumEditar.id=albumInterfaz.id;
      this.albumEditar.nombre=albumInterfaz.nombre;
      this.albumEditar.imagen=albumInterfaz.imagen;
      this.albumEditar.descripcion=albumInterfaz.descripcion;
      this.albumEditar.fechaLanzamiento=albumInterfaz.fechaLanzamiento;
      this.albumEditar.precio=albumInterfaz.precio;

      
      this.albumService.putAlbumes(this.albumEditar).subscribe(data => {

        this._snackBar.open("Álbum editada con éxito", "close", { duration: 3000 });
        this.actualizarAlbum();

      })

    })
  }

  actualizarAlbum(){
 
    this.albumInterfaz = [];

    this.albumService.getListarAlbumes().subscribe( data => {
      data.forEach(element=>{
        let albumInterfaz:AlbumInterfaz=new AlbumInterfaz();
        albumInterfaz.id=element.id;
        albumInterfaz.nombre=element.nombre;
        albumInterfaz.imagen=element.imagen;
        albumInterfaz.fechaLanzamiento=element.fechaLanzamiento;
        albumInterfaz.descripcion=element.descripcion;
        albumInterfaz.precio=element.precio;
        albumInterfaz.artista=element.artista;
        albumInterfaz.editable=false;
        this.albumInterfaz.push(albumInterfaz);
      })
      this.albumInterfazFiltrados=this.albumInterfaz.filter(album=>album.nombre.toLocaleLowerCase().includes(""))
      
    });
  }

}

class AlbumInterfaz{

  id!: number;
  nombre!: string;
  imagen!: string;
  descripcion!: string;
  fechaLanzamiento!: string;
  precio!: number;
  artista!:string;
  editable!:boolean;
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlbumSelect } from 'src/app/_model/AlbumSelect';
import { Formato } from 'src/app/_model/Formato';
import { AlbumService } from 'src/app/_service/albumes.service';
import { CancionesService } from 'src/app/_service/canciones.service';

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

  constructor(private cancionService: CancionesService,
    private albumService: AlbumService) { 
    this.cancionForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      album: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      duracion: new FormControl('', [Validators.required]),
      formato: new FormControl('', [Validators.required]),
      colaboraciones: new FormControl('', [Validators.required]),
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
  }

}

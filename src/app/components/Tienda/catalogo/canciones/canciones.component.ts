import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/_model/Album';
import { Cancion } from 'src/app/_model/Cancion';
import { CancionesService } from 'src/app/_service/canciones.service';
import { VentasService } from 'src/app/_service/ventas.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {
  idAlbum!: number;
  cancion!: Cancion[];
  cancionesForm!: FormGroup;
  total!: number;

  constructor(private cancionService: CancionesService,
    private route: ActivatedRoute) { 
      this.cancionesForm = this.createFormGroup();
    }

  createFormGroup() {
    return new FormGroup({
      nombreCancion: new FormControl(''),
      precio: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idAlbum = params.id;

      if (this.idAlbum != undefined) {
        this.cancionService.getCanciones(this.idAlbum).subscribe( data => {
          this.cancion = data;
        });
      }
    });
  }
}

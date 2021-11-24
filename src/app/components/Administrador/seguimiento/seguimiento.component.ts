import { Component, OnInit } from '@angular/core';
import { VistaAlbum } from 'src/app/_model/VistaAlbum';
import { VistaArtista } from 'src/app/_model/VistaArtista';
import { AlbumService } from 'src/app/_service/albumes.service';
import { ArtistaService } from 'src/app/_service/artistas.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  vistaArtista: VistaArtista[] = [];
  vistaArMostrar: VistaArtista[] = [];
  vistaAlbum: VistaAlbum[] = [];
  vistaAlMostrar: VistaAlbum[] = [];

  constructor(private artistaService: ArtistaService,
    private albumService: AlbumService) { }

  ngOnInit(): void {
    this.artistaService.getVistaArtista().subscribe( data => {
      this.vistaArtista = data;
      this.vistaArMostrar = data;
    });

    this.albumService.getVistaAlbum().subscribe( data => {
      this.vistaAlbum = data;
      this.vistaAlMostrar = data;
    });
  }

  filtrarArtista(event: Event) {
    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    this.vistaArMostrar = this.vistaArtista.filter(a => a.nombre.toLowerCase().includes(elemento.value.toLowerCase()));
  }

  filtrarAlbum(event: Event) {
    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    this.vistaAlMostrar = this.vistaAlbum.filter(a => a.nombre.toLowerCase().includes(elemento.value.toLowerCase()));
  }

}

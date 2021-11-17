import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Album } from 'src/app/_model/Album';
import { AlbumService } from 'src/app/_service/albumes.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  albumes!: Album[];
  catalogo!: Album[]; 
  formatoMoneda!: Intl.NumberFormat;
  dataSource!: MatTableDataSource<Album>;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.getListarAlbumes().subscribe( data => {
      this.albumes = data;
      this.catalogo = data;
    });
  }

}

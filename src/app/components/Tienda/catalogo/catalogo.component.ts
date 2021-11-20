import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/_model/Album';
import { VentasService } from 'src/app/_service/ventas.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  catalogo!: Album[]; 

  constructor(private ventasService: VentasService) { }

  ngOnInit(): void {
    this.ventasService.getCatalogo().subscribe( data => {
      this.catalogo = data;
    });
  }

}

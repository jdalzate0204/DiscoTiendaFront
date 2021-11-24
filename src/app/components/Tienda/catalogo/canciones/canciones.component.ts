import { Component, OnInit } from '@angular/core';
import { CancionesService } from 'src/app/_service/canciones.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {

  constructor(private cancionService:CancionesService) { }

  ngOnInit(): void {
  }

}

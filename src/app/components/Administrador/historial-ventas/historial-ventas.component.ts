import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/_model/Venta';
import { VentasService } from 'src/app/_service/ventas.service';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasComponent implements OnInit {

  venta: Venta[] = [];
  ventaMostrar: Venta[] = [];

  constructor(private ventasService: VentasService) { }

  ngOnInit(): void {
    this.ventasService.getHistorial().subscribe( data => {
      this.venta = data;
      this.ventaMostrar = data;
    });
  }

  filtrar(event: Event) {
    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    this.ventaMostrar = this.venta.filter(a => a.nombreCliente.toLowerCase().includes(elemento.value.toLowerCase())
    || a.correo.toLowerCase().includes(elemento.value.toLowerCase())
    || a.pago.toLowerCase().includes(elemento.value.toLowerCase()))
  }

}

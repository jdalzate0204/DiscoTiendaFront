import { Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/_model/Pago';
import { VentasService } from 'src/app/_service/ventas.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  selectPago: Pago = {id: 0, descripcion: ''};
  pago!: Pago[];

  constructor(private ventaService: VentasService) { }

  ngOnInit(): void {
    this.ventaService.getSelectPago().subscribe( data => {
      this.pago = data;
    });
  }

}

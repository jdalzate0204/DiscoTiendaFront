import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasService } from 'src/app/_service/ventas.service';
import { environment } from 'src/environments/environment';
//import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  cantidadArticulos!: number;
  celular!: string;
  correo!: string;
  direccion!: string;
  fechaCompra!: string;
  idPago!: number;
  nombreCliente!: string;
  total!: number;
  pago!: string;

  constructor(private ventasService: VentasService,
    private router: Router) { }

  ngOnInit(): void {
    let datosFactura: any = sessionStorage.getItem(environment.DATOSVENTA);
    let JSONFactura = JSON.parse(datosFactura);

    this.cantidadArticulos = JSONFactura.cantidadArticulos;
    this.celular = JSONFactura.celular;
    this.correo = JSONFactura.correo;
    this.direccion = JSONFactura.direccion;
    this.fechaCompra = JSONFactura.fechaCompra;
    this.idPago = JSONFactura.idPago;
    this.nombreCliente = JSONFactura.nombreCliente;
    this.total = JSONFactura.total;

    this.ventasService.getListarPago(this.idPago).subscribe( data => {
      this.pago = data.descripcion;
    });
    
  }

  salir() {
    sessionStorage.removeItem(environment.DATOSVENTA);
    this.router.navigate(['/catalogo']);
  }

  export() {

    /*const options = {
      filename: "FacturaJAALmusic.pdf",
      image: { type: 'jpeg' },
      html2canvas: {scale: 2},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait'}
    };
    const element = document.getElementById('content');
    html2pdf().from(element).set(options).save();*/

  }
}
